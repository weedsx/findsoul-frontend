import requests from "/src/plugins/axios-config";
import qs from "qs";

export function searchUsersByTags(tagList) {
  return requests({
    url: "/user/search/tags",
    params: {tagList},
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false});
    }
  });
}

export function login(userAccount, userPassword) {
  return requests({
    url: "/user/login",
    method: "POST",
    data: {
      userAccount,
      userPassword
    }
  });
}

export function getCurrentUser() {
  return requests({
    url: "/user/current",
    method: "get",
  });
}

export function updateUser(user) {
  return requests({
    url: "/user/update",
    method: "post",
    data: user
  });
}

export function updateTeam(team) {
  return requests({
    url: "/team/update",
    method: "post",
    data: team
  });
}

export function recommendUsers(current, size) {
  return requests({
    url: "/user/recommend",
    method: "get",
    params: {currentPage: current, pageSize: size}
  });
}

export function addTeam(team) {
  return requests({
    url: "/team/add",
    method: "post",
    data: team
  });
}

export function getTeamList(teamQuery) {
  return requests({
    url: "/team/list",
    method: "post",
    params: teamQuery
  });
}

export function getTeamById(teamId) {
  return requests({
    url: "/team/get",
    method: "get",
    params: {id: teamId}
  });
}

export function joinTeam(joinTeamRequest) {
  return requests({
    url: "/team/join",
    method: "post",
    data: joinTeamRequest
  });
}

export function quitTeam(team) {
  return requests({
    url: "/team/quit",
    method: "post",
    data: team
  });
}

export function getMyCreatedTeam() {
  return requests({
    url: "/team/list/my/created",
    method: "post",
  });
}

export function getMyJoinedTeam() {
  return requests({
    url: "/team/list/my/joined",
    method: "post",
  });
}

export function matchUsers(num) {
  return requests({
    url: "/user/match",
    method: "get",
    params: {num}
  });
}