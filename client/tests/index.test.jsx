import React from 'react';
import { mount } from 'enzyme';

describe('Home page tests', () => {
    it('Smoke test - renders everything correctly', () => {
        const wrapper = mount(
            <Router>
                <App />
            </Router>
        );

        expect(wrapper.find("Button")).toBeDefined();
    });
});