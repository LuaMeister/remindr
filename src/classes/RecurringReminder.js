
export class RecurringReminder
{
    /**
     * @description Sets the Reminder's name which will be used as the index in the Reminders object
     * @param {String} name
     */
    setName(name)
    {
        this.name = name;
        return this;
    }
    
    /**
     * @description Sets the Reminder's type which will be used to add certain behaviour to each type
     * @param {String} type 
     */
    setType(type)
    {
        this.type = type;
        return this;
    }

    /**
     * @description Sets the Reminder's interval for when the Reminder should recur
     * @param {String} interval;
     * @returns 
     */
    setInterval(interval)
    {
        // TODO: Parse the interval string and convert it to a number
        this.interval = interval;
        return this;
    }
}