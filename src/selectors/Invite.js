
/**
 * Selector that checks if the Invites should get fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchInvites = (state) => {

    return !isFetchingInvites(state) && !state.Invite.FetchedList;

};

/**
 * Selector that checks if the Invites are getting fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingInvites = (state) => {

    return !!state.Invite.FetchingList;

};

/**
 * Selector that returns all the invites
 * @param {Object} state
 * @return {Function}
 */
export const getInvites = (state) => {

    return state.Invite.List;

};

/**
 * Selector that returns a single invite
 * @param {Object} state
 * @param  {String} inviteID
 * @return {Object} invite
 */
export const getInvite = (state, inviteID) => {

    return state.Invite.List[inviteID];

};

/**
 * Selector that checks if the Invite should get fetched
 * @param {Object} state
 * @param  {String} inviteID
 * @return {Function}
 */
export const shouldFetchInvite = (state, inviteID) => {

    return !getInvite(state, inviteID) &&
        !isFetchingInvite(state) &&
        !getFetchError(state);

};

/**
 * Selector that checks if the Invites are getting fetched
 * @param {Object} state
 * @param  {String} inviteID
 * @return {Function}
 */
export const isFetchingInvite = (state) => {

    return !!state.Invite.Fetching;

};

/**
 * Selector that returns fetch error
 * @param {Object} state
 * @param  {String} inviteID
 * @return {Function}
 */
export const getFetchError = (state) => {

    return state.Invite.FetchError;

};

/**
 * Selector that returns all the invites
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const getInvitesByTeam = (state, teamID) => {

    return getInvites(state).filter(invite => invite.teamId == teamID);

};

/**
 * Selector that returns all the invites
 * @param {Object} state
 * @param {String} teamID
 * @return {Function}
 */
export const getSavedInvite = (state) => {

    return state.Invite.SavedID;

};

export default {
    shouldFetchInvites,
    isFetchingInvites,
    getInvites,
    getInvite,
    shouldFetchInvite,
    isFetchingInvite,
    getSavedInvite,
};
