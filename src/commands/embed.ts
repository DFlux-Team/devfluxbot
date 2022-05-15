import quiz from "./quiz.json";
import { SlashCommandBuilder } from "@discordjs/builders";
import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import schedule from "node-schedule";
import { CommandInterface } from "../interface/CommandInterface";

export const embed: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("reacting to embeds"),

  run: async (interact) => {
    // const scheduledTask = async () => {
    //   const res = quiz.data[Math.floor(Math.random() * quiz.data.length)];

    //   const reactEmbed = new MessageEmbed()
    //     .setTitle("Quiz")
    //     .setDescription(res.question);

    //   for (let i of res.options) {
    //     reactEmbed.addField(`${res.options.indexOf(i) + 1}. ${i}`, "\u200b");
    //   }
    //   const op = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
    //   const pos = res.options.indexOf(res.answer);
    //   const correctReact = op[pos];

    //   const filter = (reaction: any, user: any) => {
    //     return user.id !== interact.client.user?.id;
    //   };

    //   const message = (await interact.channel?.send({
    //     embeds: [reactEmbed],
    //   })) as Message;

    //   for (let i = 0; i < res.options.length; i++) {
    //     message.react(op[i]);
    //   }

    //   const collector = message.createReactionCollector({
    //     filter,
    //     max: 1,
    //     time: 10 * 1000,
    //   });

    //   collector.on("collect", (react, user) => {
    //     react.users.remove(user.id).then(() => {
    //       if (react.emoji.name === correctReact) {
    //         interact.editReply({ embeds: [reactEmbed] });
    //       } else {
    //         interact.followUp({
    //           content: "You are wrong.. Try again",
    //           ephemeral: true,
    //         });
    //       }
    //     });
    //   });
    // };

    // schedule.scheduleJob("*/12 * * * * *", async () => {
    //   scheduledTask();
    // });

    await interact.deferReply();
    const scheduledTask = async () => {
      const res = quiz.data[Math.floor(Math.random() * quiz.data.length)];

      const reactEmbed = new MessageEmbed()
        .setTitle("Quiz")
        .setDescription(res.question);

      for (let i of res.options) {
        reactEmbed.addField(`${res.options.indexOf(i) + 1}. ${i}`, "\u200b");
      }
      const op = ["1", "2", "3", "4", "5", "6"];
      const pos = res.options.indexOf(res.answer);
      const correctReact = op[pos];

      const filter = (user: any) => {
        return user.id !== interact.client.user?.id;
      };

      const btnrow = new MessageActionRow();

      for (let i = 0; i < res.options.length; i++) {
        btnrow.addComponents(
          new MessageButton()
            .setLabel(op[i])
            .setStyle("PRIMARY")
            .setCustomId(`${op[i]}`)
        );
      }

      const collector = interact.channel!.createMessageComponentCollector({
        filter,
        max: 1,
        time: 10 * 1000,
      });

      await interact.editReply({
        embeds: [reactEmbed],
        components: [btnrow],
      });

      collector.on("collect", async (opr) => {
        await opr.deferUpdate();
        if (opr.customId === correctReact) {
          reactEmbed.addField(`Answered by \`${opr.user.tag}\``, "\u200b");
          opr.update({ embeds: [reactEmbed] });
        } else {
          opr.followUp({
            content: "You are wrong.. Try again",
            ephemeral: true,
          });
        }
      });
    };

    schedule.scheduleJob("*/12 * * * * *", async () => {
      scheduledTask();
    });

    // const btnrow = new MessageActionRow();

    // const values: string[] = ["1", "2", "3", "4", "5"];

    // for (let i in values) {
    //   btnrow.addComponents(
    //     new MessageButton()
    //       .setLabel(values[i])
    //       .setStyle("PRIMARY")
    //       .setCustomId(`btn${values[i]}`)
    //   );
    // }

    // const collector = interact.channel?.createMessageComponentCollector({
    //   time: 15000,
    //   max: 1,
    // });

    // await interact.reply({
    //   content: "This is a button testing process",
    //   components: [btnrow],
    // });

    // collector?.on("collect", async (i) => {
    //   for (let i = 0; i < btnrow.components.length; i++) {
    //     btnrow.components[i].setDisabled(true);
    //   }
    //   await i.update({
    //     content: `\`${i.user.tag}\` clicked first`,
    //     components: [btnrow],
    //   });
    // });

    // collector?.on("end", (collected) =>
    //   console.log(`Interaction size ${collected.size}`)
    // );
  },
};
