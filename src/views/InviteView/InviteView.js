
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import Router from 'Utils/Router';
import { INVITE_PATH } from 'Constants/Paths';

// Redux Actions
import InviteActions from 'Actions/Invite';
import NotificationActions from 'Actions/Notification';

// Redux Selectors
import { getInvite, isFetchingInvite, getFetchError } from 'Selectors/Invite';
import { getPathParts, doesPathMatch } from 'Selectors/Router';
import { isLoggedIn } from 'Selectors/User';

// Components
import { BaseViewComponent } from 'Components/Global/BaseViewComponent';
import 'Components/Global/SifiveLoader';
import 'Components/Global/SifiveButton';

import { getStyles } from './Styles';

/**
 * InviteView LitElement
 * template for /invite
 */
@customElement('invite-view')
class InviteView extends BaseViewComponent {

    @property({ type: Object })
    invite = {};

    @property({ type: Boolean })
    loggedIn = false;

    @property({ type: Boolean })
    fetching = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        if (this.fetching || !this.invite) {

            return html`<sifive-loader></sifive-loader>`;

        }

        let creator;
        if (this.invite.creator) {

            const creatorID = this.invite.creator.id;
            const creatorName = `${this.invite.creator.firstname} ${this.invite.creator.lastname}`;

            creator = html`from <a href="${`/user/${creatorID}`}">${creatorName}</a>`;

        }

        let actions;

        if (!this.invite.isUsed) {

            actions = html`
            <div class="button-container">
                <sifive-button class="accept" label="Accept Invitation" @click="${this.onAcceptClick}"></sifive-button>
                Or&nbsp;<div class="decline" @click="${this.onDeclineClick}">decline</div>&nbsp;this invitation
            </div>`;

        }

        return html`
            <!-- InviteView Component -->
            <div class="grid-container">
                <div class="wrapper">
                    <div class="eyebrow">Team invitation ${creator}</div>
                    <h1>${this.invite.team.name}</h1>
                    <h5>${this.invite.team.description}</h5>
                    ${this.fetchError}
                    ${actions}
                </div>
            </div>
        `;

    }

    /**
     * Get current User if not in state
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        if (this.inviteID) {

            this.store.dispatch(InviteActions.getInviteIfNeeded(this.inviteID));

        }

        if (!this.loggedIn && this.inviteID) {

            this.store.dispatch(InviteActions.saveInviteID(this.inviteID));
            Router.push('/');

        }

        if (this.invite && this.invite.isUsed) {

            this.store.dispatch(NotificationActions
                .showError(`This invite has already been used!`));

            Router.push('/');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.active = doesPathMatch(state, INVITE_PATH);
        this.loggedIn = isLoggedIn(state);

        if (this.active) {

            this.inviteID = getPathParts(state, INVITE_PATH)[1];

            if (this.inviteID) {

                this.fetching = isFetchingInvite(state);
                this.invite = getInvite(state, this.inviteID);
                this.fetchError = getFetchError(state);

            }

        }

    }

    /**
     * Click Callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAcceptClick(event) {

        this.store.dispatch(InviteActions.accept(this.inviteID))
            .then(({ response }) => {

                if (response.isUsed) {

                    Router.push('/');

                }

            });

    }

    /**
     * Click Callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDeclineClick(event) {

        Router.push('/');

    }

}

export { InviteView };
