package com.exam.events;

import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.base.util.UtilHttp;
import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.webapp.control.LoginWorker;

import com.exam.forms.HibernateValidation;
import com.exam.forms.checks.LoginFormCheck;
import com.exam.helper.HibernateHelper;

public class LoginEvent {

	public static final String module = LoginEvent.class.getName();
	public static String resource_error = "OnlineExamPortalUiLabels";

	public static String dologin(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute("delegator");
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute("dispatcher");
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute("userLogin");

		Locale locale = UtilHttp.getLocale(request);
		String username = request.getAttribute("USERNAME").toString();
		String password = request.getAttribute("PASSWORD").toString();
		Map<String, Object> combinedMap = UtilHttp.getCombinedMap(request);
		/*
		 * String username1 = (String) combinedMap.get("USERNAME"); String password1 =
		 * (String) combinedMap.get("PASSWORD"); combinedMap.put("username", username1);
		 * combinedMap.put("password", password1);
		 */
		
		Map<String, Object> userLoginMap = UtilMisc.toMap("username", username, "password", password);
				
		Debug.log("=======\\\\\\\\\\\\Event values\\\\\\\\\\\\=========" + username + "\\\\\\\\\\\\" + password);

		try {
			Debug.log("=======Logging in process started=========", module);
			System.out.println("Event Delegator-" + delegator);
			HibernateValidation Hibernet = HibernateHelper.populateBeanFromMap(userLoginMap, HibernateValidation.class);
			Set<ConstraintViolation<HibernateValidation>> errors = HibernateHelper.checkValidationErrors(Hibernet,
					LoginFormCheck.class);
			boolean hasFormErrors = HibernateHelper.validateFormSubmission(delegator, errors, request, locale,
					"MandatoryFieldErrMsgLoginForm", resource_error, false);
			String result = LoginWorker.login(request, response);
//            Map<String, Object> result = dispatcher.runSync("Login", UtilMisc.toMap("username", username,
//                    "password", password,"delegator",delegator));
//            //String str=LoginWorker.loginUserWithUserLoginId(request,response,username);
			System.out.println("result======================" + result);
			request.setAttribute("result", result);
			request.setAttribute("hibernatresult", hasFormErrors);
		} catch (Exception e) {
			String errMsg = "Error in calling or excecuting the service: " + e.toString();
			request.setAttribute("_ERROR_MESSAGE_", errMsg);
			return "error";
		}
		request.setAttribute("_EVENT_MESSAGE_", "Login succesfully.");
		return "success";
	}
}