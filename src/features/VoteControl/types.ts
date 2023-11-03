import { IVoteState } from "../../store/voteSlice";

export interface IVoteControl {
  title: string;
  id: number;
  vote: IVoteState;
  handleCompleteVote: (voteId: number) => void;
  handleResultsVote: (voteId: number) => void;
  handleEnableVote: (voteId: number) => void;
}
