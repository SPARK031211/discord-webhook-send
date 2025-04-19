$("#dws_name").keyup(function (e) {
	var content = $(this).val();

	//글자수 세기
	if (content.length == 0 || content == "") {
		$(".dws_contents_length").text("0");
	} else {
		$(".dws_contents_length").text(content.length);
	}

	if (content.length > 1000) {
		// 1000자 부터는 타이핑 되지 않도록
		$(this).val($(this).val().substring(0, 1000));
	}
});

let oldValue = null, oldLen = 0;
const dws_contents = document.getElementById("dws_name"), letterCount = document.getElementById("dws_contents_length");

setInterval(() => {
  if (oldLen == dws_contents.value.length && oldValue === dws_contents.value) return;
  oldLen = dws_contents.value.length;
  oldValue = dws_contents.value;
  letterCount.innerText = Array.from(oldValue).length;
}, 1);

function dws() {
	var dws_name = document.getElementById("dws_name").value;
	var dws_contents = document.getElementById("dws_contents").value;
	const jsweburl = "Your discord channel webhook url";

	if (!dws_name) {
		document.getElementById("dws_error_box").style.display = "block";
		document.getElementById("dws_error_msg").innerText = "오류 발생: 보내는 사람 입력란이 비어있습니다.";
		return false;
	} else {
		document.getElementById("dws_error_box").style.display = "none";
		document.getElementById("dws_error_msg").innerText = "";
	}

	if (!dws_contents) {
		document.getElementById("dws_error_box").style.display = "block";
		document.getElementById("dws_error_msg").innerText = "오류 발생: 내용 입력란이 비어있습니다.";
		return false;
	} else {
		document.getElementById("dws_error_box").style.display = "none";
		document.getElementById("dws_error_msg").innerText = "";
	}

	const request = new XMLHttpRequest();
	request.open("POST", jsweburl);
	request.setRequestHeader("Content-type", "application/json");

	const params = {
		username: dws_name,
	  content: "```보내는 사람: " + dws_name + "```" + "```내용: " + dws_contents + "```"
	}

	try {
		request.send(JSON.stringify(params));
		//document.getElementById("dws_name").value = "";
		//document.getElementById("dws_contents").value = "";
		console.log("Success")
		document.getElementById("dws_send_btn").innerText = "전송완료";
	} catch (err) {
		console.error("Failed: 전송에 실패했습니다.")
		document.getElementById("dws_error_msg").innerText = "오류 발생: 전송에 실패했습니다.";
		document.getElementById("dws_send_btn").innerText = "전송실패";
	}
}