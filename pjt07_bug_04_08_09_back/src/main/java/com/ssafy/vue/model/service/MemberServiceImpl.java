package com.ssafy.vue.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.MemberDto;
import com.ssafy.vue.model.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
	final String HOST_URL = "http://localhost:9999/happyhouse";

	@Autowired
	private SqlSession sqlSession;

	@Autowired
	MailService mailService;

	@Override
	public MemberDto login(MemberDto memberDto) throws Exception {
		if (memberDto.getUserid() == null || memberDto.getUserpwd() == null)
			return null;
		return sqlSession.getMapper(MemberMapper.class).login(memberDto);
	}

	@Override
	public MemberDto userInfo(String userid) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).userInfo(userid);
	}

	@Override
	public void saveRefreshToken(String userid, String refreshToken) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", refreshToken);
		sqlSession.getMapper(MemberMapper.class).saveRefreshToken(map);
	}

	@Override
	public Object getRefreshToken(String userid) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).getRefreshToken(userid);
	}

	@Override
	public void deleRefreshToken(String userid) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", null);
		sqlSession.getMapper(MemberMapper.class).deleteRefreshToken(map);
	}

	@Override
	public boolean registUser(MemberDto memberDto) throws Exception {
		final String code = makeAuthCode();
		memberDto.setAuthkey(code);
		mailService.sendMail(memberDto.getEmail(), "인증코드 :" + code);
		return sqlSession.getMapper(MemberMapper.class).registUser(memberDto) == 1;
	}

	@Override
	public boolean modifyUser(MemberDto modifyUser) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).modifyUser(modifyUser) == 1;
	}

	@Override
	public boolean deleteUser(String userid) throws Exception {
		return sqlSession.getMapper(MemberMapper.class).removeUser(userid) == 1;
	}

	@Override
	public List<MemberDto> list() throws Exception {
		return sqlSession.getMapper(MemberMapper.class).selectAll();
	}

	@Override
	public boolean getUserId(String email) throws Exception {
		String userId = sqlSession.getMapper(MemberMapper.class).getUserId(email);
		if (userId != null && !userId.equals("")) {
			mailService.sendMail(email, userId);
			return true;
		}
		return false;
	}

	@Override
	public boolean getUserPwd(String userId) throws Exception {
		MemberDto user = sqlSession.getMapper(MemberMapper.class).getUserPwd(userId);
		if (userId != null && !userId.equals("")) {
			mailService.sendMail(user.getEmail(), user.getUserpwd());
			return true;
		}
		return false;
	}

	@Override
	public boolean authentication(String id, String authcode) throws Exception {
		String ans = sqlSession.getMapper(MemberMapper.class).getAuthCode(id);
		if (ans.equals(authcode)) {
			sqlSession.getMapper(MemberMapper.class).updateAuth(id);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public void regenerate(String userId) throws Exception {
		final String code = makeAuthCode();
		MemberDto memberDto = new MemberDto();
		memberDto.setUserid(userId);
		memberDto.setAuthkey(code);
		MemberDto user = sqlSession.getMapper(MemberMapper.class).userInfo(userId);
		mailService.sendMail(user.getEmail(), "인증코드 : " + code);
		sqlSession.getMapper(MemberMapper.class).updateAuthCode(memberDto);
	}

	@Override
	public String makeAuthCode() {
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		return uuid.substring(0, 8);
	}
}
