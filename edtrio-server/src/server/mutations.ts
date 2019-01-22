import { IContextType } from "../index";

export const mutations = {
  Mutation: {
    createUser(root: any, args: any, context: IContextType) {
      return context.prisma.createUser({
        name: args.name,
        isTeacher: args.isTeacher,
      });
    },
    createDocument(root: any, args: any, context: IContextType) {
      return context.prisma.createDocument({
        value: args.value,
        users: {
          connect: args.userIds.map((id: string) => {
            return { id };
          }),
        },
      });
    },
    updateDocument(root: any, args: any, context: IContextType) {
      if (args.value) {
        context.valueChangedPubSub.publish("VALUE_CHANGED" + args.documentId, {
          valueChanged: args,
        });
      }
      let users;
      if (args.userIds) {
        users = {
          users: {
            connect: args.userIds.map((id: string) => {
              return { id };
            }),
          },
        };
      }
      return context.prisma.updateDocument({
        where: { id: args.documentId },
        data: {
          ...users,
          value: args.value,
        },
      });
    },
    createPoll(root: any, args: any, context: IContextType) {
      return context.prisma.createPoll({
        votingAllowed: args.votingAllowed,
        displayResults: args.displayResults,
      });
    },
    deletePoll(root: any, args: any, context: IContextType) {
      context.prisma.deleteManyPollAnswers({ poll: args.pollId });
      return context.prisma.deletePoll({ id: args.pollId });
    },
    updatePoll(root: any, args: any, context: IContextType) {
      return context.prisma.updatePoll({
        where: { id: args.pollId },
        data: {
          votingAllowed: args.votingAllowed,
          displayResults: args.displayResults,
        },
      });
    },
    async createPollAnswer(root: any, args: any, context: IContextType) {
      const newAnswer = await context.prisma.createPollAnswer({
        poll: {
          connect: args.pollId,
        },
      });
      const pollAnswers = await context.prisma
        .poll({ id: args.pollId })
        .answers();
      pollAnswers.push(newAnswer);

      return context.prisma.updatePoll({
        where: { id: args.pollId },
        data: {
          answers: {
            connect: pollAnswers.map(answer => ({ id: answer.id })),
          },
        },
      });
    },
    deletePollAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.deletePoll({ id: args.pollAnswerId });
    },
    async addSubmissionToPollAnswer(
      root: any,
      args: any,
      context: IContextType,
    ) {
      const users = await context.prisma
        .pollAnswer({ id: args.pollAnswerId })
        .votes();
      const userIds = users.map(user => ({ id: user.id }));
      userIds.push({ id: args.userId });

      context.valueChangedPubSub.publish(`POLL_CHANGED_${args.pollId}`, {
        valueChanged: args,
      });

      return context.prisma.updatePollAnswer({
        where: { id: args.pollAnswerId },
        data: {
          votes: {
            connect: userIds,
          },
        },
      });
    },
  },
};