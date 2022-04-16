import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import { getFluxer } from "../db/get";
import { updateFluxer, updateQuizNumber } from "../db/update";
import { CommandInterface } from "../interface/CommandInterface";

export const monthly: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Monthly Quiz Tournament"),

  run: async (interact) => {
    const user = await getFluxer(interact.user.id);

    if (user!.noMonQuiz! <= 2) {
      const { data } = await axios.get("https://quizapi.io/api/v1/questions", {
        headers: {
          "X-Api-Key": process.env["API_KEY"] as string,
        },
      });

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

      const message = (await interact.reply({
        embeds: [quizEmbed],
        fetchReply: true,
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
            const update = await updateFluxer(user!.discordId as string);
            quizEmbed.addFields(
              { name: "Correct Answer", value: finalAnswer as string },
              {
                name: "Current Score",
                value: update!.score.toString() ?? "0",
              }
            );
            interact.editReply({ embeds: [quizEmbed] });
            console.log("update complete");
            interact.followUp(
              "Do you eat Brains for Breakfast?👀\nBecause you are correct 💐👍"
            );
            // for adding points
          } else {
            await updateQuizNumber(user!.discordId);
            quizEmbed.addFields(
              { name: "Correct Answer", value: finalAnswer as string },
              {
                name: "Current Score",
                value: (user!.score.toString() as string) ?? "0",
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
      await interact.reply(
        "You can only attempt 10 quizzes for the monthly tournment.\nAlternatively u can use the `/quiz` command to enjoy the Quiz.🙌"
      );
    }
  },
};
