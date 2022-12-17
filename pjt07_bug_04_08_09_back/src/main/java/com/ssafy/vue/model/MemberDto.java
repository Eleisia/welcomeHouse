package com.ssafy.vue.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "MemberDto : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class MemberDto {

	@ApiModelProperty(value = "회원 아이디")
	private String userid;
	@ApiModelProperty(value = "회원 이름")
	private String username;
	@ApiModelProperty(value = "회원 비밀번호")
	private String userpwd;
	@ApiModelProperty(value = "회원 이메일")
	private String email;
	@ApiModelProperty(value = "회원 가입일")
	private String joindate;
	@ApiModelProperty(value = "관리자 계정")
	private Boolean isadmin;
	@ApiModelProperty(value = "메일 인증")
	private Boolean isauth;
	@ApiModelProperty(value = "인증코드")
	private String authkey;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpwd() {
		return userpwd;
	}

	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getJoindate() {
		return joindate;
	}

	public void setJoindate(String joindate) {
		this.joindate = joindate;
	}

	public Boolean getIsadmin() {
		return isadmin;
	}

	public void setIsadmin(Boolean isadmin) {
		this.isadmin = isadmin;
	}

	public Boolean getIsauth() {
		return isauth;
	}

	public void setIsauth(Boolean isauth) {
		this.isauth = isauth;
	}

	public String getAuthkey() {
		return authkey;
	}

	public void setAuthkey(String authcode) {
		this.authkey = authcode;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("MemberDto [userid=").append(userid).append(", username=").append(username).append(", userpwd=")
				.append(userpwd).append(", email=").append(email).append(", joindate=").append(joindate)
				.append(", isadmin=").append(isadmin).append(", isauth=").append(isauth).append(", authcode=")
				.append(authkey).append("]");
		return builder.toString();
	}
}
