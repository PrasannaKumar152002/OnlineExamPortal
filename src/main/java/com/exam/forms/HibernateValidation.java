package com.exam.forms;

import org.hibernate.validator.constraints.NotEmpty;

import com.exam.forms.checks.LoginFormCheck;

public class HibernateValidation {

	@NotEmpty(message = "username is empty", groups = { LoginFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "Invalid Email type", groups = {
			LoginFormCheck.class })
	private String username;
	@NotEmpty(message = "password is empty", groups = { LoginFormCheck.class })
	@javax.validation.constraints.Pattern(regexp = "^.{5,}", message = "Invalid Password type", groups = {
			LoginFormCheck.class })
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
