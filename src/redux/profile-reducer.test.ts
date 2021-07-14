import profileReducer, {actions} from "./profile-reducer";
import React from "react";
import {profileType} from "../types/types";

//start test data
let state = {
    postsData: [
        {id: 1, message: 'message 1', likesCount: 10},
        {id: 2, message: 'message 2', likesCount: 11},
        {id: 3, message: 'message 3', likesCount: 14},
        {id: 4, message: 'message 4', likesCount: 111},
        {id: 5, message: 'message 5', likesCount: 112},
    ],
    profile: null,
    status: ""
};


it('length og posts should be incremented', () => {
    let action = actions.addPostAС("some text of post");
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postsData.length).toBe(6);
});

it('message of new post should be correct', () => {
    let action = actions.addPostAС("some test text for post");
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postsData[5].message).toBe("some test text for post");
});

it('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);
    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postsData.length).toBe(4);
});

it(`after deleting length of messages should't be decrement if ID is incorrect`, () => {
    let action = actions.deletePost(1000);    //action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.postsData.length).toBe(5);
});
