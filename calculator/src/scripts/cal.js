function Calc(val) {
	if(val != "=")
		document.form.txtval.value = document.form.txtval.value + val;
	else
		document.form.txtval.value = eval(document.form.txtval.value);
}