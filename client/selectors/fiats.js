import moment from 'moment';

export default (fiats, search)=>{

    return { data: fiats.filter((fiat)=>{
            const symbolMatch = search ? fiat.symbol.toLowerCase().includes(search.toLowerCase()) : true;
            const priceMatch = search ? fiat.price.toString().includes(search.toLowerCase()) : true;
            const createdAtMatch = search ? moment(fiat.createdAt).toISOString().includes(search.toLowerCase()) : true;
            const timestampMatch = search ? moment.unix(fiat.timestamp).toISOString().includes(search.toLowerCase()) : true;
            
            return symbolMatch || priceMatch || createdAtMatch || timestampMatch;
        })
    }
};