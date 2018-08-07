import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

let wrapped;

beforeEach(()=>{
  wrapped = shallow(<App/>);
})

it('should render correctly the App component with CommentBox', ()=>{

  expect(wrapped.find(CommentBox).length).toEqual(1);

});

it('should render the CommentList componet', ()=>{

  expect(wrapped.find(CommentList).length).toEqual(1)
})