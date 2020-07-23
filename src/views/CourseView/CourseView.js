
import {
    html, customElement, property,
} from 'lit-element';

// Redux Actions
import ViewActions from 'Actions/View';

// Redux Selectors
import {
    isCreatingCourse,
    isShowingCourse,
    isEditingCourse,
    isFetchingList,
    getCourseID,
} from 'Selectors/Course';
import { getViewState } from 'Selectors/View';

// Components
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Course/CourseCreate';
import 'Components/Course/CourseMain';
import 'Components/Course/CourseEdit';
import 'Components/Global/SifiveLoader';

import { getStyles } from './Styles';

// Action states
const FETCHING = 'ACTION.FETCHING';
const SHOWING = 'ACTION.SHOWING';
const CREATING = 'ACTION.CREATING';
const EDITING = 'ACTION.EDITING';

/**
 * CourseView LitElement
 * template for /course
 */
@customElement('course-view')
class CourseView extends PrivateViewComponent {

    @property({ type: String })
    action = FETCHING;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * @return {String}  html output
     */
    render() {

        switch (this.action) {

            case FETCHING:
                return html`<sifive-loader></sifive-loader>`;

            case SHOWING:
                return html`<course-main></course-main>`;

            case CREATING:
                return html`<course-create></course-create>`;

            case EDITING:
                return html`<course-edit></course-edit>`;

        }

        return html`<!-- CourseView Component -->`;

    }

    /**
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        const isEditing = this.action === EDITING;
        const isCreating = this.action === CREATING;

        const state = {
            isEditing: isEditing,
            courseID: !isCreating ? this._courseID : undefined,
        };

        this.store.dispatch(
            ViewActions.setFreshState(state)
        );

    }

    /**
     * @param {Object} state
     */
    stateChanged(state) {

        super.stateChanged(state);

        const isShowing = isShowingCourse(state);
        const isEditing = isEditingCourse(state);
        const isCreating = isCreatingCourse(state);

        if (isShowing) {

            this.action = SHOWING;
            this._courseID = getCourseID(state);

        } else if (isEditing) {

            this.action = EDITING;
            this._courseID = getCourseID(state);

        } else if (isCreating) {

            this.action = CREATING;

        }

        this._viewState = getViewState(state);

        this.action = this._viewState.isEditing ? EDITING : this.action;

        if (this._viewState.courseID &&
            this._courseID !== this._viewState.courseID && !isCreating) {

            this.store.dispatch(
                ViewActions.setState({
                    courseID: this._courseID,
                })
            );

        }

        if (isFetchingList(state)) {

            this.action = FETCHING;

        }


    }

}

export { CourseView };
