function AjaxResponse(statusBool, statusMessage, responseContent) // Constructor
{
    this.statusBool = statusBool;
	this.statusMessage = statusMessage;
	this.responseContent = responseContent;
}

AjaxResponse.prototype.getStatusBool = function ()
{
    return this.statusBool;
};

AjaxResponse.prototype.getStatusMessage = function ()
{
    return this.statusMessage;
};

AjaxResponse.prototype.getResponseContent = function ()
{
    return this.responseContent;
};

function AjaxArgument(parameterName, parameterValue) // Constructor
{
    this.parameterName = parameterName;
	this.parameterValue = parameterValue;
}

AjaxArgument.prototype.getParameterName = function ()
{
    return this.parameterName;
};

AjaxArgument.prototype.getParameterValue = function ()
{
    return this.parameterValue;
};