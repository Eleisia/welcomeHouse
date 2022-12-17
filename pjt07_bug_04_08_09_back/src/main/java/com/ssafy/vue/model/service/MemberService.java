package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;

	public MemberDto userInfo(String userid) throws Exception;

	public void saveRefreshToken(String userid, String refreshToken) throws Exception;

	public Object getRefreshToken(String userid) throws Exception;

	public void deleRefreshToken(String userid) throws Exception;

	public boolean registUser(MemberDto memberDto) throws Exception;

	public boolean modifyUser(MemberDto modifyUser) throws Exception;

	public boolean deleteUser(String userid) throws Exception;

	public List<MemberDto> list() throws Exception;

	public boolean getUserId(String email) throws Exception;

	public boolean getUserPwd(String userId) throws Exception;

	public boolean authentication(String id, String authcode) throws Exception;

	public void regenerate(String userId) throws Exception;

	public String makeAuthCode();
}
