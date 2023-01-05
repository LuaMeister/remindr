
class RecurringReminder
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
     * @description Sets the Reminder's message which will be displayed when the reminder's interval has happened
     * @param {String} message
     */
    setMessage(message)
    {
        this.message = message;
        return this;
    }

    /**
     * @description Sets the Reminder's interval for when the Reminder should recur
     * @param {String} interval;
     */
    setInterval(interval)
    {
        // TODO: Parse the interval string and convert it to a number
        this.interval = interval;
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
}

module.exports = {
    RecurringReminder
}