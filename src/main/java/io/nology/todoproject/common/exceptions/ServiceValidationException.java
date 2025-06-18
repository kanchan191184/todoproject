package io.nology.todoproject.common.exceptions;

import io.nology.todoproject.common.ValidationErrors;

public class ServiceValidationException extends Exception{

    private ValidationErrors errors;

    public ServiceValidationException(ValidationErrors errors) {
        this.errors = errors;
    }

    public ValidationErrors getErrors() {
        return this.errors;
    }
    
}
