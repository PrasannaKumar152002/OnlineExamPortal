package com.exam.services;

import java.util.HashMap;

import java.util.Iterator;
import java.util.Map;

import org.apache.ofbiz.base.util.Debug;
import org.apache.ofbiz.base.util.UtilProperties;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityCrypto;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.entity.util.EntityUtilProperties;
import org.apache.ofbiz.service.DispatchContext;
import org.apache.ofbiz.service.ServiceUtil;
import org.apache.ofbiz.webapp.control.LoginWorker;
import org.apache.ofbiz.entity.model.ModelField;
import org.apache.ofbiz.common.login.LoginServices;

public class TopicService {

	public static final String module = TopicService.class.getName();

	public static Map<String, Object> addtopic(DispatchContext dctx, Map<String, ? extends Object> context) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> dataResult = new HashMap<String, Object>();
		System.out.println("EnteredTopicService...." + context);
		String topic = (String) context.get("Topic");
//		String pass = (String) context.get("password");
		Delegator delegator = (Delegator) context.get("delegator");
		try {
			System.out.println("Delegator-" + delegator);
			//GenericValue userLogin = EntityQuery.use(delegator).from("TopicMaster").where("userLoginId", user).queryOne();
			
//			Debug.log("==========Login failed===== ");
//			dataResult.put("dataresult", "Invalid password");
//			result.put("dataResultStatus", dataResult);
//			result.put("status", "failed");
//			System.out.println("resultservice" + result);
			return result;
		} catch (Exception e) {
			Debug.logError(e, module);
			return ServiceUtil.returnError("Error in Login Service java class ........Invalid email" + module);
		}
	}
}