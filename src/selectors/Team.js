
import pathRegexp from 'path-to-regexp';

import { getUser } from 'Selectors/User';

import { TEAM_PATH } from 'Constants/Paths';

/**
 * Selector that checks if the Teams should get fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchTeams = (state) => {

    return !isFetchingTeams(state) && !state.Team.FetchedList;

};

/**
 * Selector that checks if the Teams are getting fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingTeams = (state) => {

    return !!state.Team.FetchingList;

};

/**
 * Selector that checks if the Team data should get fetched
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const shouldFetchTeam = (state, teamID) => {

    return !isFetchingTeam(state, teamID) &&
        (!state.Team.List[teamID] || !state.Team.List[teamID].Fetched);

};

/**
 * Selector that checks if Team data is being fetched
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const isFetchingTeam = (state, teamID) => {

    return !(!state.Team.List[teamID] || !state.Team.List[teamID].Fetching);

};

/**
 * Selector that checks if the Team course data should get fetched
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const shouldFetchTeamCourses = (state, teamID) => {

    const teamState = state.Team.List[teamID];

    return !isFetchingTeamCourses(state, teamID) &&
        (
            !teamState ||
            (
                !teamState.FetchedCourses &&
                !teamState.FetchCoursesError
            )
        );

};

/**
 * Selector that checks if Team data is being fetched
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const isFetchingTeamCourses = (state, teamID) => {

    return !(!state.Team.List[teamID] ||
        !state.Team.List[teamID].FetchingCourses);

};

/**
 * Selector that returns the team list
 * @param {Object} state
 * @return {Function}
 */
export const getTeams = (state) => {

    return state.Team.List;

};

/**
 * Selector that returns the team list
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const getTeam = (state, teamID) => {

    return state.Team.List[teamID];

};

/**
 * Selector that returns the team courses
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const getTeamCourses = (state, teamID) => {

    const team = getTeam(state, teamID);
    return team && team.courses;

};

/**
 * Selector that returns the team members
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const getTeamMembers = (state, teamID) => {

    const team = getTeam(state, teamID);
    return team && team.users &&
        team.users.map(user => getUser(state, user.id));

};

/**
 * Selector that returns the team id found in the current route
 * @param {Object} state
 * @return {Function}
 */
export const getTeamID = (state) => {

    const pathCheck = pathRegexp(TEAM_PATH)
        .exec(state.Router.Route.path);

    return pathCheck !== null ? pathCheck[1] : undefined;

};

/**
 * Selector that checks if the TeamView is displayed
 * @param {Object} state
 * @return {Function}
 */
export const isShowingTeam = (state) => {

    return pathRegexp(TEAM_PATH).test(state.Router.Route.path);

};

export default {
    shouldFetchTeams,
    isFetchingTeams,
    shouldFetchTeam,
    isFetchingTeam,
    getTeams,
    getTeam,
    getTeamID,
    getTeamCourses,
    getTeamMembers,
    isShowingTeam,
};
