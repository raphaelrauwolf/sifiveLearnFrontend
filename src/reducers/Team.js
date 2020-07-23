
import {
    GET_CURRENT_SUCCESS,
} from 'Actions/User';

import {
    START_GET_TEAM, GET_TEAM_SUCCESS, GET_TEAM_ERROR,
    START_GET_TEAMS, GET_TEAMS_SUCCESS, GET_TEAMS_ERROR,
    START_GET_TEAM_COURSES, GET_TEAM_COURSES_SUCCESS, GET_TEAM_COURSES_ERROR,
    START_CREATE_TEAM_INVITE,
    CREATE_TEAM_INVITE_SUCCESS, CREATE_TEAM_INVITE_ERROR,
    START_ASSIGN_COURSE, ASSIGN_COURSE_SUCCESS, ASSIGN_COURSE_ERROR,
} from 'Actions/Team';

const INITIAL_STATE = {
    List: {},
};

const Team = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case GET_CURRENT_SUCCESS: {

            const teams = action.response.teams;
            return {
                ...state,
                List: {
                    ...state.List,
                    ...teams.reduce((object, team) => {

                        object[team.id] = {
                            ...state.List[team.id],
                            ...team,
                        };
                        return object;

                    }, {}),
                },
            };

        }

        /**
         * GetTeam Actions
         */
        case START_GET_TEAM:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        Fetching: true,
                    },
                },
            };
        case GET_TEAM_SUCCESS:
            delete state.List[action.teamID].Fetching;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        Fetched: true,
                        ...action.response,
                    },
                },
            };
        case GET_TEAM_ERROR:
            delete state.List[action.teamID].Fetching;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        Fetched: false,
                        FetchError: action.response,
                    },
                },
            };

        /**
         * GetTeams Actions
         */
        case START_GET_TEAMS:
            delete state.FetchedList;
            delete state.FetchListError;
            return {
                ...state,
                FetchingList: true,
            };
        case GET_TEAMS_SUCCESS: {

            delete state.FetchingList;
            const teams = action.response;
            return {
                ...state,
                List: {
                    ...state.List,
                    ...teams.reduce((object, team) => {

                        object[team.id] = {
                            ...state.List[team.id],
                            ...team,
                        };
                        return object;

                    }, {}),
                },
                FetchedList: true,
            };

        }
        case GET_TEAMS_ERROR:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: false,
                FetchListError: action.response,
            };

        /**
         * GetTeamCourses Actions
         */
        case START_GET_TEAM_COURSES:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        FetchingCourses: true,
                        FetchCoursesError: undefined,
                    },
                },
            };
        case GET_TEAM_COURSES_SUCCESS:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        courses: action.response,
                        FetchedCourses: true,
                        FetchingCourses: false,
                    },
                },
            };
        case GET_TEAM_COURSES_ERROR:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        FetchedCourses: false,
                        FetchingCourses: false,
                        FetchCoursesError: action.response,
                    },
                },
            };

        /**
         * CreateTeamInvite Actions
         */
        case START_CREATE_TEAM_INVITE:
            return {
                ...state,
                CreatingInvite: true,
            };
        case CREATE_TEAM_INVITE_SUCCESS:
            return {
                ...state,
                CreatedInvite: true,
            };
        case CREATE_TEAM_INVITE_ERROR:
            return {
                ...state,
                CreatedInvite: false,
                CreateInviteError: action.response,
            };

        /**
         * AssignCourse Actions
         */
        case START_ASSIGN_COURSE:
            return {
                ...state,
                AssigningCourse: true,
            };
        case ASSIGN_COURSE_SUCCESS:
            delete state.AssigningCourse;
            return {
                ...state,
                AssignedCourse: true,
                List: {
                    ...state.List,
                    [action.teamID]: {
                        ...state.List[action.teamID],
                        courses: [
                            ...state.List[action.teamID].courses,
                            action.course,
                        ],
                    },
                },
            };
        case ASSIGN_COURSE_ERROR:
            delete state.AssigningCourse;
            return {
                ...state,
                AssignedCourse: false,
                AssignCourseError: action.response,
            };

        default:
            return state;

    }

};

export { Team };
