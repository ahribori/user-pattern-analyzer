import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';

class ImageContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const imagePath = this.props.image ? process.env.REACT_APP_SERVER_URL + '/' + this.props.image : null;
        return (
            <div id="heatmapContainer" style={{
                backgroundImage: `url(${imagePath})`,
            }}>
                <Spinning size="large" id="spinner"/>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        const container = document.querySelector('#heatmapContainer');
        if (!this.props.screen) {
            const heatmapContainer = document.querySelector('#heatmapContainer');
            heatmapContainer.style.backgroundImage = 'url(null)';
        } else {
            const width = this.props.screen.split('*')[0];
            const height = this.props.screen.split('*')[1];
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
        }
        if (prevProps.points !== this.props.points && this.props.points) {
            const heatmap = window.h337.create({
                container: container
            });
            heatmap.setData({
                max: 5,
                data: this.props.points
            })
        }
    }

}

export default ImageContainer;