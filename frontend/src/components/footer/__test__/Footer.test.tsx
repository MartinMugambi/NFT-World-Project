import {render, screen, fireEvent} from "@testing-library/react"

import Footer from '../footer'

beforeEach(()=>{

    render(<Footer />)
})


describe("", ()=>{

    test("should render correact heading", ()=>{

        const headingElement = screen.getByTestId("heading")

        expect(headingElement).toBeInTheDocument();
    })

    test("should render a paragraph", ()=>{

        const paragraphElement = screen.getByTestId("paragraph");
        expect(paragraphElement).toBeInTheDocument();
    })

    test("Should render four social-icons", ()=>{

        const socialIcon = screen.queryAllByTestId("social-icon");

        expect(socialIcon.length).toEqual(4)
    })

     
})