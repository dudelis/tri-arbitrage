import moment from 'moment';

export default (tickers, filters)=>{

    return { data: tickers.filter((ticker)=>{
        const search = filters.search;
        const symbolMatch = search && ticker.symbol ? ticker.symbol.toLowerCase().includes(search.toLowerCase()) : true;
        const bidMatch = search && ticker.bid ? ticker.bid.toString().includes(search.toLowerCase()) : true;
        const askMatch = search && ticker.ask ? ticker.ask.toString().includes(search.toLowerCase()) : true;
        const createdAtMatch = search ? moment(ticker.createdAt).toISOString().includes(search.toLowerCase()) : true;
        const timestampMatch = search ? moment(ticker.timestamp).toISOString().includes(search.toLowerCase()) : true;
        
        const exId = filters.exchangeId;
        const exchangeMatch = exId ? exId === ticker._exchange : true;
        
        return (symbolMatch || bidMatch || askMatch || createdAtMatch || timestampMatch) && exchangeMatch;
        })
    }
};