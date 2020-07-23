
import {
    html,
} from 'lit-element';

import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveRoundButton';
import 'Components/Global/SifiveDropzone';
import 'Components/Global/SifiveSortable';
import 'Components/Lesson/LessonAccordion';
import 'Components/Module/ModuleAccordion';

export const lessonListFactory = (
        module, lessons = [],
        addLessonToModule, editLesson, deleteLesson, sortLesson) => {

    return lessons.sort((a, b) => {

        return a.order - b.order;

    }).map((lesson) => {

        const onDeleteDrop = (event) => {

            deleteLesson(module, lesson);

        };

        const onModuleDrop = (event) => {

            const { payload } = event.detail;

            addLessonToModule(payload.module, module, lesson);

        };

        const onSorted = (event) => {

            const { startIndex, targetIndex } = event.detail;
            sortLesson(module, lesson, targetIndex, targetIndex < startIndex);

        };

        return html`
        <sifive-sortable
            .sortGroup=${'course-edit-component-lesson'}
            .handleSelector=${'sifive-round-button.lesson-reorder'}
            @delete-drop=${onDeleteDrop}
            @module-drop=${onModuleDrop}
            @sorted=${onSorted}>
            <div>
                <lesson-accordion .lesson=${lesson}>
                    <div slot="bar-content">
                        <sifive-round-button @click="${() => editLesson(module, lesson)}">
                            <svg-icon slot="icon" src="assets/images/icons/edit.svg"></svg-icon>
                        </sifive-round-button>
                        <sifive-round-button class="lesson-reorder">
                            <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                        </sifive-round-button>
                    </div>
                </lesson-accordion>
                <div class="lesson-dragging">
                    <svg-icon slot="icon" src="assets/images/icons/lesson.svg"></svg-icon>
                    ${lesson.name}
                </div>
            </div>
        </sifive-sortable>`;

    });

};

export const moduleDraggingFactory = (module) => {

    let lessons = '';

    if (Array.isArray(module.lessons) && module.lessons.length > 0) {

        lessons = html`
        <div class="module-lessons">
            + ${module.lessons.length}
            <svg-icon slot="icon" src="assets/images/icons/lesson.svg"></svg-icon>
            ${module.lessons.length <= 1 ? 'Lesson' : 'Lessons'}
        </div>`;

    }

    return html`
        <div class="module-dragging">
            <div class="module-info">
                <svg-icon slot="icon" src="assets/images/icons/module.svg"></svg-icon>
                ${module.name}
            </div>
            ${lessons}
        </div>`;

};

export const moduleListFactory = (
        modules,
        addLessonToModule,
        createLesson, editLesson, deleteLesson, sortLesson,
        createModule, editModule, deleteModule, sortModule) => {

    return modules.sort((a, b) => {

        return a.order - b.order;

    }).map((module) => {

        const onDeleteDrop = (event) => {

            deleteModule(module);

        };

        const onSorted = (event) => {

            const { startIndex, targetIndex } = event.detail;
            sortModule(module, targetIndex, targetIndex < startIndex);

        };

        const lessons = lessonListFactory(
            module, module.lessons,
            addLessonToModule, editLesson, deleteLesson, sortLesson);

        const moduleDragging = moduleDraggingFactory(module);

        let moduleContent = html`
            <module-accordion
                ?open=${module.lessons && module.lessons.length > 0}
                ?openable=${module.lessons && module.lessons.length > 0}
                .module="${module}">
                <div slot="bar-content">
                    <sifive-round-button @click="${() => editModule(module)}">
                        <svg-icon slot="icon" src="assets/images/icons/edit.svg"></svg-icon>
                    </sifive-round-button>
                    <sifive-round-button class="module-reorder">
                        <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                    </sifive-round-button>
                </div>
                <div slot="content">${lessons}</div>
            </module-accordion>
            ${moduleDragging}`;

        if (module.lessons && module.lessons.length <= 0) {

            moduleContent = html`
                <sifive-dropzone class="module-drop"
                    .dropEventName=${'module-drop'}
                    .droppableClass=${'droppable-module'}
                    .payload=${{ module }}>
                    ${moduleContent}
                </sifive-dropzone>`;

        }

        return html`
            <sifive-sortable
                .sortGroup=${'course-edit-component-module'}
                .handleSelector=${'sifive-round-button.module-reorder'}
                @delete-drop=${onDeleteDrop}
                @sorted=${onSorted}>
                <div>
                ${moduleContent}
                </div>
            </sifive-sortable>
            <div class="module-add-lesson-container">
                <div class="add-lesson"
                    @click="${() => createLesson(module)}">
                    <svg-icon src="assets/images/icons/add.svg"></svg-icon>
                    Add another Lesson
                </div>
            </div>`;

    });

};

export const overviewFactory = (
        course, nameCourse, stopEditing,
        addLessonToModule,
        createLesson, editLesson, deleteLesson, sortLesson,
        createModule, editModule, deleteModule, sortModule,
) => {

    const modules = course.modules;

    let content = html`<p>No modules or lessons added.</p>`;

    if (modules && modules.length > 0) {

        content = moduleListFactory(
            modules, addLessonToModule,
            createLesson, editLesson, deleteLesson, sortLesson,
            createModule, editModule, deleteModule, sortModule,
        );

    }

    return html`
        <!-- CourseCreate -->
        <top-bar visible>
            <div slot="content" class="top-bar-content grid-container">
                <div class="back-link" @click="${() => stopEditing()}">
                    <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon> Back
                </div>
                <sifive-dropzone class="remove-drop" dropEventName="delete-drop">
                    <div>Drag & drop to remove</div>
                    <sifive-round-button>
                        <svg-icon slot="icon" src="assets/images/icons/trash.svg"></svg-icon>
                    </sifive-round-button>
                </sifive-dropzone>
            </div>
        </top-bar>
        <div class="grid-container">
            <div class="header-container">
                <div class="info-container">
                    <h5>${course.name}</h5>
                    <div class="header">
                        <p>${course.description}</p>
                    </div>
                    <sifive-round-button @click="${() => nameCourse()}">
                        <svg-icon slot="icon" src="assets/images/icons/edit.svg"></svg-icon>
                    </sifive-round-button>
                </div>
            </div>
            <div class="content-container">
                <h5>Course Content</h5>
                ${content}
                <sifive-button @click="${() => createModule()}" label="Create Module">
                    <svg-icon slot="icon" src="assets/images/icons/module.svg"></svg-icon>
                </sifive-button>
            </div>
        </div>`;

};
