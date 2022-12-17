package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.MemberDto;

@Mapper
public interface MemberMapper {

	public MemberDto login(MemberDto memberDto) throws SQLException;

	public MemberDto userInfo(String userid) throws SQLException;

	public void saveRefreshToken(Map<String, String> map) throws SQLException;

	public Object getRefreshToken(String userid) throws SQLException;

	public void deleteRefreshToken(Map<String, String> map) throws SQLException;

	public int registUser(MemberDto memberDto) throws SQLException;

	public int removeUser(String userid) throws SQLException;

	public List<MemberDto> selectAll() throws SQLException;

	public int modifyUser(MemberDto memberDto) throws SQLException;

	public String getUserId(String email) throws SQLException;

	public MemberDto getUserPwd(String userid) throws SQLException;
	
	public String getAuthCode(String userid) throws SQLException;
	
	public void updateAuth(String userid) throws SQLException;
	
	public void updateAuthCode(MemberDto memberDto) throws SQLException;
}
