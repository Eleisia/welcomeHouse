package com.ssafy.vue.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.MemberDto;
import com.ssafy.vue.model.service.JwtServiceImpl;
import com.ssafy.vue.model.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러  API V1")
@CrossOrigin("*")
public class MemberController {

	public static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private static final String DUPLICATE = "duplicate";

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private MemberService memberService;

	@ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) MemberDto memberDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			MemberDto loginUser = memberService.login(memberDto);
			if (loginUser != null) {
				String accessToken = jwtService.createAccessToken("userid", loginUser.getUserid());// key, data
				String refreshToken = jwtService.createRefreshToken("userid", loginUser.getUserid());// key, data
				memberService.saveRefreshToken(memberDto.getUserid(), refreshToken);
				logger.debug("로그인 accessToken 정보 : {}", accessToken);
				logger.debug("로그인 refreshToken 정보 : {}", refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("auth", loginUser.getIsauth());
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/info/{userid}")
	public ResponseEntity<Map<String, Object>> getInfo(
			@PathVariable("userid") @ApiParam(value = "인증할 회원의 아이디.", required = true) String userid,
			HttpServletRequest request) {
//		logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		if (jwtService.checkToken(request.getHeader("access-token"))) {
			logger.info("사용 가능한 토큰!!!");
			try {
//				로그인 사용자 정보.
				MemberDto memberDto = memberService.userInfo(userid);
				resultMap.put("userInfo", memberDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "로그아웃", notes = "회원 정보를 담은 Token을 제거한다.", response = Map.class)
	@GetMapping("/logout/{userid}")
	public ResponseEntity<?> removeToken(@PathVariable("userid") String userid) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			memberService.deleRefreshToken(userid);
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			logger.error("로그아웃 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);

	}

	@ApiOperation(value = "Access Token 재발급", notes = "만료된 access token을 재발급받는다.", response = Map.class)
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestBody MemberDto memberDto, HttpServletRequest request)
			throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader("refresh-token");
		logger.debug("token : {}, memberDto : {}", token, memberDto);
		if (jwtService.checkToken(token)) {
			if (token.equals(memberService.getRefreshToken(memberDto.getUserid()))) {
				String accessToken = jwtService.createAccessToken("userid", memberDto.getUserid());
				logger.debug("token : {}", accessToken);
				logger.debug("정상적으로 액세스토큰 재발급!!!");
				resultMap.put("access-token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} else {
			logger.debug("리프레쉬토큰도 사용불!!!!!!!");
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "메일인증", notes = "메일인증 시도, 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@GetMapping("/auth/{id}/{authcode}")
	public ResponseEntity<String> authUser(@PathVariable("id") String id, @PathVariable("authcode") String authcode) {
		logger.info("메일인증 - 호출");
		try {
			boolean res = memberService.authentication(id, authcode);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원가입", notes = "회원가입 시도, 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping("/info")
	public ResponseEntity<String> joinUser(
			@RequestBody @ApiParam(value = "회원가입.", required = true) MemberDto memberDto) {
		logger.info("registerUser - 호출");
		try {
			MemberDto baseUser = memberService.userInfo(memberDto.getUserid());
			if (null != baseUser) {
				return new ResponseEntity<String>(DUPLICATE, HttpStatus.OK);
			}
			if (memberService.registUser(memberDto)) {
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			}
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원수정", notes = "회원수정 시도, 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping("/info")
	public ResponseEntity<String> modifyUser(
			@RequestBody @ApiParam(value = "회원수정.", required = true) MemberDto memberDto) throws Exception {
		logger.info("modifyUser - 호출");
		try {
			System.out.println(memberDto.toString());
			if (memberService.modifyUser(memberDto))
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원탈퇴", notes = "회원탈퇴 시도, 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/info/{userid}")
	public ResponseEntity<String> deleteUser(@PathVariable("userid") String userid) throws Exception {
		logger.info("deleteUser - 호출");
		System.out.println(userid);
		try {
			if (memberService.deleteUser(userid))
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원조회", notes = "전체 회원 정보를 담은 list를 반환한다.", response = Map.class)
	@GetMapping("/infoall")
	public ResponseEntity<?> getInfo() {
		logger.info("member all - 호출");
		try {
			List<MemberDto> memberList = memberService.list();
			if (null != memberList)
				return new ResponseEntity<List<MemberDto>>(memberList, HttpStatus.OK);
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/find/id/{email}")
	public ResponseEntity<?> getUserId(@PathVariable("email") String email) throws Exception {
		logger.info("ID 찾기 - 호출");
		try {
			if (memberService.getUserId(email) == true)
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/find/pwd/{userid}")
	public ResponseEntity<?> getUserPwd(@PathVariable("userid") String userId) throws Exception {
		logger.info("PWD 찾기 - 호출");
		try {
			if (memberService.getUserPwd(userId) == true)
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/regenerate/{userid}")
	public ResponseEntity<?> regenerateCode(@PathVariable("userid") String userId) throws Exception {
		logger.info("authkey regenerate - 호출");
		try {
			memberService.regenerate(userId);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@ApiOperation(value = "소셜회원가입", notes = "소셜회원가입 시도, 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping("/social")
	public ResponseEntity<String> joinSocialUser(
			@ApiParam(value = "회원가입.", required = true) Object obj) {
		logger.info("socialUser - 호출");
		System.out.println(obj.toString());
		System.out.println(obj.getClass());
		return new ResponseEntity<String>(SUCCESS, HttpStatus.NO_CONTENT);
	}
}
