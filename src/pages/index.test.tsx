import {render,screen} from "@testing-library/react";
import Homepage from ".";

test('Check greeting message', ()=>{
    render(<Homepage/>)
    let greeting = screen.getByText('Learn React');
    expect(greeting).toBeInTheDocument();
})