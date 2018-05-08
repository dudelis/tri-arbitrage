
export const logFilter =  (logs, search)=>{
    return { 
        data: logs.filter((log)=>{
            const timestampMatch = search ? log.timestamp.toLowerCase().includes(search.toLowerCase()) : true;
            const levelMatch = search && log.level ? log.level.toLowerCase().includes(search.toLowerCase()) : !!log.level;
            const messagematch = search && log.message ? log.message.toLowerCase().includes(search.toLowerCase()) : !!log.message;
            const metaMatch = search && log.meta ? JSON.stringify(log.meta).toLowerCase().includes(search.toLowerCase()) : !!log.meta;
            
            return timestampMatch || levelMatch || messagematch || metaMatch;
        })
    }
};

export const logFind = (logs, id)=>{
    return logs.find(log=> log._id === id);
}