export function useDateAgo(dateAgo){
   


        let time = [
            ["seconds", 1000],
            ["minutes", 1000, 60],
            ["hours", 1000 * 60, 60],
            ["day", 1000 * 60 * 60, 24],
            ["week", 1000 * 60 * 60 * 24, 7],
            ["month", 1000 * 60 * 60 * 24 * 7, 30],
            ["year", 1000 * 60 * 60 * 24 * 7 * 30, 12]]

        time = time.map((item) => {

            let div = item[2] ? item[1] * item[2] : item[1]
            let count = Date.now() - Date.parse(dateAgo)
            let calc = (count / div).toFixed(0)
            let occured;

            if (calc < item[2] && calc !== 0) {

                occured = (`${calc} ${item[0]} ago`)

            }

            return (calc < 59 ? `${calc} ${item[0]} ago` : occured);
        }).filter(item => item !== undefined)

        return (time[0])

    }