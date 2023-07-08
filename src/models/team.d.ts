/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
  createTime: string;
  creatorId: number;
  description: string;
  expireTime: string;
  id: number;
  maxNum: number;
  name: string;
  password?: string;
  status: number;
  updateTime: string;
  creator?: UserType;
  hasJoined: boolean;
  hasJoinedNum: number
}