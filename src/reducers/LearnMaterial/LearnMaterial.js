
import { combineReducers } from 'redux';

import { Courses } from './Courses';
import { Modules } from './Modules';
import { Lessons } from './Lessons';
import { Active } from './Active';

const LearnMaterial = combineReducers({
    Courses,
    Modules,
    Lessons,
    Active,
});

export { LearnMaterial };
