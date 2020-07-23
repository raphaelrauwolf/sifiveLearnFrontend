
import {
    getCourse,
} from 'Selectors/Course';
import NotificationActions from 'Actions/Notification';

import TeamApi from 'Api/Team';

export const START_GET_TEAM = 'TEAM.START_GET_TEAM';
export const GET_TEAM_SUCCESS = 'TEAM.GET_TEAM_SUCCESS';
export const GET_TEAM_ERROR = 'TEAM.GET_TEAM_ERROR';

export const START_GET_TEAM_COURSES = 'TEAM.START_GET_TEAM_COURSES';
export const GET_TEAM_COURSES_SUCCESS = 'TEAM.GET_TEAM_COURSES_SUCCESS';
export const GET_TEAM_COURSES_ERROR = 'TEAM.GET_TEAM_COURSES_ERROR';

export const START_GET_TEAMS = 'TEAM.START_GET_TEAMS';
export const GET_TEAMS_SUCCESS = 'TEAM.GET_TEAMS_SUCCESS';
export const GET_TEAMS_ERROR = 'TEAM.GET_TEAMS_ERROR';

export const START_CREATE_TEAM_INVITE = 'TEAM.START_CREATE_TEAM_INVITE';
export const CREATE_TEAM_INVITE_SUCCESS = 'TEAM.CREATE_TEAM_INVITE_SUCCESS';
export const CREATE_TEAM_INVITE_ERROR = 'TEAM.CREATE_TEAM_INVITE_ERROR';

export const START_ASSIGN_COURSE = 'TEAM.START_ASSIGN_COURSE';
export const ASSIGN_COURSE_SUCCESS = 'TEAM.ASSIGN_COURSE_SUCCESS';
export const ASSIGN_COURSE_ERROR = 'TEAM.ASSIGN_COURSE_ERROR';

export const getTeam = (teamID) => {

    const start = () => ({ type: START_GET_TEAM, teamID });
    const success = response => ({ type: GET_TEAM_SUCCESS, teamID, response });
    const failure = response => ({ type: GET_TEAM_ERROR, teamID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return TeamApi.getTeam(teamID, currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const getTeams = () => {

    const start = () => ({ type: START_GET_TEAMS });
    const success = response => ({ type: GET_TEAMS_SUCCESS, response });
    const failure = response => ({ type: GET_TEAMS_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return TeamApi.getTeamList(currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const getTeamCourses = (teamID) => {

    const start = () => ({ type: START_GET_TEAM_COURSES, teamID });
    const success = response =>
        ({ type: GET_TEAM_COURSES_SUCCESS, teamID, response });
    const failure = response =>
        ({ type: GET_TEAM_COURSES_ERROR, teamID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return TeamApi.getTeamCourses(teamID, currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};


export const createTeamInvite = (teamID, data) => {

    const start = () => ({ type: START_CREATE_TEAM_INVITE, teamID });
    const success = response =>
        ({ type: CREATE_TEAM_INVITE_SUCCESS, teamID, response });
    const failure = response =>
        ({ type: CREATE_TEAM_INVITE_ERROR, teamID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return TeamApi.createTeamInvite(teamID, data, currentUserState.token)
            .then(
                (response) => {

                    dispatch(success(response));

                    dispatch(NotificationActions.showSuccess(`Invite sent to ${data.email}!`));

                    return Promise.resolve(response);

                },
                (error) => {

                    dispatch(failure(error));

                    dispatch(NotificationActions.showError(`Invite Error: ${error.message}`));

                    return Promise.reject(error);

                }
            );

    };

};


export const assignCourse = (teamID, courseID) => {

    const start = () => ({ type: START_ASSIGN_COURSE, teamID, courseID });
    const success = (response, course) =>
        ({ type: ASSIGN_COURSE_SUCCESS, teamID, courseID, course, response });
    const failure = response =>
        ({ type: ASSIGN_COURSE_ERROR, teamID, courseID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return TeamApi.assignCourse(teamID, courseID, currentUserState.token)
            .then((response) => {

                const course = getCourse(getState(), courseID);
                dispatch(success(response, course));
                dispatch(NotificationActions.showSuccess(`Course assigned!`));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export default {
    getTeam,
    getTeams,
    getTeamCourses,
    createTeamInvite,
    assignCourse,
};
