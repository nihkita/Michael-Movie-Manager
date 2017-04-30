package io.github.michael_movie_manager.controllers;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
@RequestMapping(value = "/api/googleauth")
public class GoogleSignInController {

    @Value("${oauth.clientId}")
    private String clientId;

    @RequestMapping(method = RequestMethod.POST, headers = "content-type=application/x-www-form-urlencoded")
    public boolean processRegistration(@RequestParam("idtoken") String idTokenString) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Arrays.asList(clientId)).setIssuer("accounts.google.com").build();
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken == null) throw new Exception("Invalid token");
        Payload payload = idToken.getPayload();
        List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(payload.getSubject(), "xx", true, true, true,
                true, authorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(payload.getSubject(), null, userDetails.getAuthorities());
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return true;
    }
    
    @RequestMapping
    public Principal getProfile(Principal principal) {
        return principal;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
