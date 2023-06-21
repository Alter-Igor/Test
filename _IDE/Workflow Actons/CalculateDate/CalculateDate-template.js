
log.Information('*** Executing step action: Calculate SLA Dates');
{
   
    let now = false
    
    let sourceDate = moment();
    
    if (!now) {
        let inputDate = "$model.Configuration.fromDate";
    
        log.Information("Date type is: " + typeof(inputDate));
    
        if (inputDate.ToString) {
            log.Information("Unwrapping .net date");
            inputDate = inputDate.ToString("o");
        }
        sourceDate = moment(inputDate);
    } 
    
    let amount = "$model.Configuration.value"
    
    
    let type = "$model.Configuration.unit";
    let result = sourceDate;
    
    log.Information(`Adding ${amount} ${type} to ${sourceDate.format("MMMM Do YYYY, h:mm:ss a")}`);
    
    if (type === "workingdays") {
        let baseDate = DateTime.Parse(sourceDate.format());
        result = moment(actions.sharedo.AddWorkingDays(baseDate, amount).ToString("o"));
    } else if (type === "workinghours") {
        let baseDate = DateTime.Parse(sourceDate.format());
        result = moment(actions.sharedo.AddWorkingHours(baseDate, amount).ToString("o"));
    } else {
        result = sourceDate.add(amount, type);
    }
    
    log.Information(`Result is ${result.format("MMMM Do YYYY, h:mm:ss a")}`);
    
    "$model.Configuration.outputVariable" = result.format();
};

log.Information('*** Finished step action: Calculate SLA Dates');