import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';

class ImageContainer extends React.Component {

    render() {
        const imagePath = this.props.image ? process.env.REACT_APP_SERVER_URL + '/' + this.props.image : null;
        return (
            <div>
                <div style={{ fontSize: '1.5rem' }}>{imagePath ? imagePath : ''}</div>
                <div id="heatmapContainer" style={{
                    border: '1px dashed grey',
                    backgroundImage: `url(${imagePath})`,
                    textAlign: 'center',
                    color: 'grey',
                }}>
                    { imagePath ? '' : '어플리케이션, 페이지, 화면 사이즈를 선택하면 결과가 나타날 영역입니다'}
                    <Spinning size="large" id="spinner" />
                </div>
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