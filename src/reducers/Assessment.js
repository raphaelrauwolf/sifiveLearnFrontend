
// DELETE THIS, THIS IS NOT BEING USED

import {
    CREATE_ASSESSMENT_EVALUATION_SUCCESS,
    CREATE_ASSESSMENT_EVALUATION_ERROR,
    CREATE_ASSESSMENT_EVALUATION_PENDING,
    ADD_ASSESSMENT_SUCCESS,
    FETCH_ASSESSMENT_STATS_SUCCESS,
    GET_PENDING_ASSESSMENTS_SUCCESS, GET_PENDING_ASSESSMENTS_ERROR,
    GET_PENDING_ASSESSMENTS_PENDING
} from 'Actions/Assessment';


export const INITIAL_STATE = {
};

const Assessment = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case CREATE_ASSESSMENT_EVALUATION_PENDING: {
            return {
                ...state,
                createAssessmentStatus: 'PENDING',

            }
        }

        case CREATE_ASSESSMENT_EVALUATION_SUCCESS: {
            const { assessmentId } = action.response

            // Remove assessment from pendingAssessments array
            const pendingAssessments = state.pendingAssessments.slice(0)
            for (let i = 0; i < pendingAssessments.length; i++) {
                if (pendingAssessments[i].id === assessmentId) {
                    pendingAssessments.splice(i, 1)
                    break
                }
            }

            return {
                ...state,
                createAssessmentStatus: 'SUCCESS',
                pendingAssessments
            }
        }

        case CREATE_ASSESSMENT_EVALUATION_ERROR: {
            return {
                ...state,
                createAssessmentStatus: 'FAILED'
            }
        }

        case ADD_ASSESSMENT_SUCCESS: {
            return {
                ...state,
            }
        }

        case FETCH_ASSESSMENT_STATS_SUCCESS: {
            return {
                ...state,
                assessmentStats: action.response
            }
        }

        // TODO: Move this assessment stuff to reducers/Assessment
        case GET_PENDING_ASSESSMENTS_SUCCESS: {
            return {
                ...state,
                pendingAssessments: action.pendingAssessments,
                pendingAssessmentsStatus: 'SUCCESS'
            }
        }

        case GET_PENDING_ASSESSMENTS_PENDING: {
            return {
                ...state,
                pendingAssessmentsStatus: 'PENDING'
            }
        }

        case GET_PENDING_ASSESSMENTS_ERROR: {
            return {
                ...state,
                pendingAssessmentsStatus: 'ERROR'
            }
        }

        default:
            return state;
    }

};

export { Assessment };
