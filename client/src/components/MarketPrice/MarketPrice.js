import React, { Component } from 'react';
import { XYPlot,
        XAxis, 
        YAxis, 
        LineSeries, 
        VerticalGridLines, 
        HorizontalGridLines,
        makeWidthFlexible,
        Crosshair,
        DiscreteColorLegend
    } from 'react-vis';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../UI/Spinner/Spinner';

import './MarketPrice.scss';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const ITEMS =  [
    'Open',
    'High',
    'Low',
    'Close'
]

class MarketPrice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prices: [],
            crosshairValues: []
        }
    }

    async componentDidMount() {
        let res = await axios.get('/api/alpha/daily/MSFT')
        this.setState({prices: res.data})
    }

    _onMouseLeave = () => {
        this.setState({crosshairValues: []})
    }
    
    formatData = (type) => {
        const { prices } = this.state;
        return prices.map((d) => {
            return {x: d.date, y: parseFloat(d[type])}
        })
    }
    
    render(){
        const {crosshairValues} = this.state;
        const openPrice = this.formatData("open");
        const highPrice = this.formatData("high");
        const lowPrice = this.formatData("low");
        const closePrice = this.formatData("close");
        const priceArray = [openPrice, lowPrice, closePrice, highPrice];
        
        return(
            <FlexibleXYPlot
                onMouseLeave={this._onMouseLeave}
                xType="ordinal"
                height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <DiscreteColorLegend 
                    className="legend"
                    orientation="horizontal"
                    height={200} 
                    items={ITEMS} />
                <XAxis hideTicks />
                <YAxis />
                <LineSeries
                    animation
                    data={priceArray[0]}/>
                <LineSeries
                    animation
                    data={priceArray[1]}/>
                <LineSeries
                    animation
                    data={priceArray[2]}/>
                <LineSeries
                    animation
                    onNearestX={(d, {index}) => {
                        return this.setState({crosshairValues: priceArray.map( i => i[index])})}}
                    data={highPrice}/>
                <Crosshair values={crosshairValues}>
                    <div className="tickerBox">
                        <h3>Values of crosshair</h3>
                        <p>Open Price: {crosshairValues[0] ? crosshairValues[0].y : ''}</p>
                        <p>Low Price: {crosshairValues[1] ? crosshairValues[1].y : ''}</p>
                        <p>Close Price: {crosshairValues[2] ? crosshairValues[2].y : ''}</p>
                        <p>High Price: {crosshairValues[3] ? crosshairValues[3].y : ''}</p>
                    </div>
                </Crosshair>
            </FlexibleXYPlot>
        )
    }
}

const mapStateToProps = (state) => {
    const { loading, loadingError, priceFeed } = state.stockData
    return {
        loading,
        loadingError,
        priceFeed
    }
}

export default connect(mapStateToProps)(MarketPrice);