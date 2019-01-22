import { IContextType } from "../index";

export const queries = {
  Query: {
    documents(root: any, args: {}, context: IContextType) {
      return context.prisma.documents({});
    },
    user(root: any, args: any, context: IContextType) {
      return context.prisma.user({ id: args.userId });
    },
    document(root: any, args: any, context: IContextType) {
      return context.prisma.document({ id: args.documentId });
    },
    users(root: any, args: any, context: IContextType) {
      return context.prisma.users();
    },
    poll(root: any, args: any, context: IContextType) {
      return context.prisma.poll({ id: args.pollId });
    },
    pollAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.pollAnswer({ id: args.pollAnswerId });
    },
  },
};
