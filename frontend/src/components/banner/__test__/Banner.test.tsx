import {render, screen, fireEvent} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Banner from "../banner"
 

const MocKBanner = () =>{
    return <BrowserRouter>
     <Banner />
    </BrowserRouter>
}

beforeEach(()=>{
    render(<MocKBanner />)
})

describe("", () =>{
    test("should render correct heading", () =>{
    
       const headingElement = screen.getByRole("heading")
       expect(headingElement).toBeInTheDocument();
    })

    test("should render correct paragraph", () =>{

        const paragraphElement = screen.getByTestId("paragraph")
        expect(paragraphElement).toBeInTheDocument();
    })

    test("should render a button element", () =>{
        const buttoneELement = screen.getByRole("button")
        expect(buttoneELement).toBeVisible();
    })

    test("should render a button text with signup", ()=>{
        const ButtonText = screen.getByRole("button")
        expect(ButtonText.textContent).toBe("sign up")
    })

    test("should render a banner image logo", ()=>{
        const bannerImageElement = screen.getByRole("img")
        expect(bannerImageElement).toBeVisible();
    })

    test("button should be clickable", ()=>{
        const clickableButton = screen.getByRole("button")
        fireEvent.click(clickableButton)
        expect(clickableButton).toBeVisible();
    })
})