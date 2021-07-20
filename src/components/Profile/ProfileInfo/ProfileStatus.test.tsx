import React from "react";
import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status = "status-test" updateUserStatus={() => Promise } />);
        const instance = component.root.instance;
        expect(instance.state.status).toBe("status-test");
    });

    test("after creation span with status should be displayed", () => {
        const component = create(<ProfileStatus status = "status-test" updateUserStatus={() => Promise } />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation input shouldnt be displayed", () => {
        const component = create(<ProfileStatus status = "status-test" updateUserStatus={() => Promise } />);
        const root = component.root;
        expect( () => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("input should be displayed in edit mode", () => {
        const component = create(<ProfileStatus status = "status-test" updateUserStatus={() => Promise } />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("status-test");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status = "status-test" updateUserStatus={mockCallback}/>);
        const instance = component.root.instance;
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});