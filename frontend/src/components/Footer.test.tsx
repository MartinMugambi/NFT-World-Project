import {render, screen, fireEvent} from "@testing-library/react"
import Footer from "./footer"



describe("Footer", ()=>{

    test("should render a text element",async () => {
        
        render(<Footer />)

        const headElement =  await screen.findByText(/company/i)
        expect(headElement).toBeTruthy();
    })

})