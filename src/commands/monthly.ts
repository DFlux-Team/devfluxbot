import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import { getFluxer } from "../db/get";
import { updateFluxer, updateMonthly, updateQuizNumber } from "../db/update";
import { CommandInterface } from "../interface/CommandInterface";

export const monthly: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Monthly Quiz Tournament"),

  run: async (interact) => {
    await interact.deferReply();
    const user = await getFluxer(interact.user.id);

    if (!user) {
      await interact.editReply(
        "You have to be registered in order to record your points.\nRun the `/register` command to register yourself."
      );
    } else {
      if (user!.round! <= 3) {
        const { data } = await axios.get(
          "https://quizapi.io/api/v1/questions",
          {
            headers: {
              "X-Api-Key": process.env["API_KEY"] as string,
            },
          }
        );

        let res = data[Math.floor(Math.random() * data.length)];

        const quizEmbed = new MessageEmbed()
          .setTitle(`Quiz Time for ${interact.user.username}`)
          .setDescription(res.question as string)
          .setAuthor({
            name: interact.user.tag as string,
            iconURL: interact.user.displayAvatarURL() as string,
          })
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter({
            text: `Request by ${interact.user.tag}` as string,
            iconURL: interact.user.displayAvatarURL() as string,
          });

        const filter = (ch: any) => {
          return ch.author.id === interact.user.id;
        };

        const opts = Object.values(res.answers).filter((x) => x);
        const correctOpts = Object.values(res.correct_answers);

        let answerPos: number = 0;
        for (let i = 0; i < opts.length; i++) {
          quizEmbed.addField(
            (`${i + 1}. ${opts[i]}` as string) ?? "no option",
            "\u200B"
          );
        }
        for (let x = 0; x < correctOpts.length; x++) {
          if (correctOpts[x] === "true") answerPos = x;
          else continue;
        }

        let finalAnswer = opts[answerPos];

        const message = (await interact.editReply({
          embeds: [quizEmbed],
        })) as Message;

        const user = await getFluxer(interact.user.id);

        message.channel
          .awaitMessages({
            filter,
            max: 1,
            time: 15 * 1000,
            errors: ["time"],
          })
          .then(async (m: any) => {
            m = m.first();
            console.log("Entering conditions");
            if (m.content.toLowerCase() === (answerPos + 1).toString()) {
              console.log("Starting update");
              const update = await updateMonthly(user!.discordId, true);
              quizEmbed.addFields(
                { name: "Correct Answer", value: finalAnswer as string },
                {
                  name: "Current Monthly Score",
                  value: (update!.monScore!.toString() as string) ?? "0",
                },
                {
                  name: "Current QuestionCount/Round",
                  value:
                    (update!
                      .noMonQuiz!.toString()
                      .concat(` / ${update!.round}`) as string) ?? "0/0",
                }
              );
              interact.editReply({ embeds: [quizEmbed] });
              console.log("update complete");
              interact.followUp(
                "Do you eat Brains for Breakfast?👀\nBecause you are correct 💐👍"
              );
            } else {
              await updateQuizNumber(user!.discordId);
              const update = await updateMonthly(user!.discordId, false);
              quizEmbed.addFields(
                { name: "Correct Answer", value: finalAnswer as string },
                {
                  name: "Current Monthly Score",
                  value: (update!.monScore!.toString() as string) ?? "0",
                },
                {
                  name: "Current QuestionCount/Round",
                  value:
                    (update!
                      .noMonQuiz!.toString()
                      .concat(` / ${update!.round}`) as string) ?? "0/0",
                }
              );
              interact.editReply({ embeds: [quizEmbed] });
              interact.followUp(`💔Wrong Answer! Better Luck next time 🙌`);
            }
          })
          .catch((e) => {
            quizEmbed.addField("Correct Answer", finalAnswer as string);
            interact.editReply({ embeds: [quizEmbed] });
            interact.followUp(`❌ No one answered the question!`);
          });
      } else {
        await interact.editReply(
          "You can only attempt 3 rounds for the monthly tournment.\nAlternatively u can use the `/quiz` command to enjoy the Quiz.🙌"
        );
      }
    }
  },
};
