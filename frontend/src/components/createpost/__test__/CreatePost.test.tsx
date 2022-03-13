import {screen, render, fireEvent} from "@testing-library/react"
import {BrowserRouter} from "react-router-dom"
import CreatePost from "../createPost";
const MockCreatePost = () =>{
    return (
      <BrowserRouter>
       <CreatePost />
      </BrowserRouter>
    );
}

beforeEach(()=>{
    render(<MockCreatePost />)
})

describe("",()=>{

    test("should render correct heading", ()=>{

        const headingElement = screen.getByText(/Create Your Post/i)
        expect(headingElement).toBeInTheDocument();
    })

    test("should render h3 title in the form", ()=>{
    
        const formTitleElement =  screen.getByText(/title/i)
        expect(formTitleElement).toBeInTheDocument();
    })

    test("should render an empty title at initial render", ()=>{

        const titleText = screen.getByPlaceholderText("Title");
        expect(titleText).toHaveValue("")
    })

    test("title form input should be changable", ()=>{
        const titleChangeInput = screen.getByPlaceholderText("Title")
        fireEvent.change(titleChangeInput, {target: {
            value: "title"
        }})

    })

    test("should render h3 description in the form", ()=>{
        const formDescriptionElement = screen.getByText(/description/i)
        expect(formDescriptionElement).toBeInTheDocument();
    })

    test("should render an empty textArea at initial render", ()=>{
        const descriptionText = screen.getByPlaceholderText("description")
        expect(descriptionText).toHaveValue("");
    })

    test("desciprtion form textarea should be editable", ()=>{
        
    const textAreaChangeInput = screen.getByPlaceholderText("description")
    fireEvent.change(textAreaChangeInput, {target:{
        value: "description"
    }})
    })

    test("should render h3 form text for uploading image", ()=>{
        const headingText = screen.getByText(/Select image file to upload/i)
        expect(headingText).toBeInTheDocument();
    })

    test("form file input should be changeable", ()=>{
        const fileText = screen.getByTestId("file")
        fireEvent.change(fileText, {target: {
            value: ""
        }})
    })

    test("should dispaly button with submit test", ()=>{
        const buttonText = screen.getByRole("button");
        expect(buttonText.textContent).toBe("Submit")
    })

    test("submit button should be clickable and change to loading", ()=>{

        const buttonElement =  screen.getByRole("button")
        fireEvent.click(buttonElement)
        expect(buttonElement.innerText).not.toBe("Submit")
    })
})
 