import * as Bootstrap from "react-bootstrap"

function Slide(){
    return(
        <Bootstrap.Carousel>
            <Bootstrap.Carousel.Item>
                <img className="image-slide"
                src="Image/SlideImage/banner2.jpg"
                alt="Banner"
                />
            </Bootstrap.Carousel.Item>
            <Bootstrap.Carousel.Item>
                <img className="image-slide"
                src="Image/SlideImage/banner2.jpg"
                alt="Banner"
                />
            </Bootstrap.Carousel.Item>
            <Bootstrap.Carousel.Item>
                <img className="image-slide"
                src="Image/SlideImage/banner2.jpg"
                alt="Banner"
                />
            </Bootstrap.Carousel.Item>
        </Bootstrap.Carousel>
    )
}
export default Slide