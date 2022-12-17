package com.ssafy.vue.model.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String receiver, String msg) {
        
        // 수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();
        
        // 수신 대상 추가
        toUserList.add(receiver);
        
        // 수신 대상 개수
        int toUserSize = toUserList.size();
        
        // SimpleMailMessage (단순 텍스트 구성 메일 메시지 생성할 때 이용)
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        
        // 수신자 설정
        simpleMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));
        simpleMessage.setFrom("HappyHouseTeam");
     
        // 메일 제목
        simpleMessage.setSubject("HappyHouse");
        
        // 메일 내용
        StringBuilder sb = new StringBuilder();
        sb.append("HappyHouse 요청 정보\n").append(msg);
        simpleMessage.setText(sb.toString());
        
        // 메일 발송
        javaMailSender.send(simpleMessage);
    }
}
