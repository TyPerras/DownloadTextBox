$(document).ready(function() {

	/////////////////////////////////////////////////////////
	// RENAME <textarea> AND <input> FORM IDS TO BE UNIQUE //
	/////////////////////////////////////////////////////////
	
	// Find and replace all of the "for" and "id" attributes names in the <label> and <textarea> and <input> attributes so that each textbox answer activity has unique independent names
	// It is neccessary to use labels and ids because it helps with navigation and highlighting for accessibility
	const textAnswerActivityTextareaLabel = document.getElementsByClassName("answerActivityTextareaLabel");
	const textAnswerActivityTextarea = document.getElementsByClassName("answerActivityTextarea");

	const textAnswerActivityInputLabel = document.getElementsByClassName("answerActivityFileNameInputLabel");
	const textAnswerActivityInput = document.getElementsByClassName("answerActivityFileNameInput");

	let i, len;
	for (i = 0, len = textAnswerActivityTextareaLabel.length; i < len; i++) {
		textAnswerActivityTextareaLabel[i].setAttribute('for', 'answerTextarea' + i);
		textAnswerActivityTextarea[i].setAttribute('id', 'answerTextarea' + i);
		textAnswerActivityInputLabel[i].setAttribute('for', 'answerFileName' + i);
		textAnswerActivityInput[i].setAttribute('id', 'answerFileName' + i);
	}



	/////////////////////////////////////
	// ANSWER BTN CLICK EVENT FUNCTION //
	/////////////////////////////////////

	// This Click Event is not only applied to the <li> item, it is also applied to all of the children nested inside of the <li> (<label>, <input>, <span>, <div>)
	// Pressing the Enter Key (or Spacebar) in screen readers whilst focused on a checkbox is treated in the same way as a click event
	$('button.btn-downloadAnswerText').click(function(event) {

		//////////////////////////////////////////////////////
		// FIND THE ANSWER <form> CURRENTLY BEING SUBMITTED //
		//////////////////////////////////////////////////////

		// event <button> element
		const TxtAnswerSubmitBtn = event.target;
		// <form> element
		const TxtAnswerForm = TxtAnswerSubmitBtn.parentElement;
		// <form> children
		const TxtAnswerFormChildren = TxtAnswerForm.children;



		///////////////////////////////////////////////////////////
		// GET TEXT ANSWER TITLE TEXT <span> OF CURRENT QUESTION //
		///////////////////////////////////////////////////////////

		// <section> element
		const TxtAnswerSection = TxtAnswerForm.parentElement;
		// <section> element children
		const TxtAnswerSectionChildren = TxtAnswerSection.children;
		// <span> .questionTitle element
		const TxtAnswerQuestionTitleElement = TxtAnswerSectionChildren[0];

		// <span> .questionTitle value
		const TxtAnswerQuestionTitleValue = TxtAnswerQuestionTitleElement.innerHTML;
		// console.log("TxtAnswerQuestionTitleValue: " + TxtAnswerQuestionTitleValue);



		//////////////////////////////////////////////////////////////////////
		// GET TEXT ANSWER INPUT FROM <textarea> OF CURRENT SELECTED ANSWER //
		//////////////////////////////////////////////////////////////////////

		// <label> for="answerTextarea"
		const TxtAnswerLabelTextArea = TxtAnswerFormChildren[0];
		// <label> for="answerTextarea" children
		const TxtAnswerLabelTextAreaChildren =  TxtAnswerLabelTextArea.children;
		// <textarea> id="answerTextarea"
		const TxtAnswerTextAreaElement = TxtAnswerLabelTextAreaChildren[0];

		// <textarea> User Input Value
		const TxtAnswerTextAreaInputValue = TxtAnswerTextAreaElement.value;
		// console.log("TxtAnswerTextAreaInputValue: " + TxtAnswerTextAreaInputValue);


		/////////////////////////////////////////////////////////////////
		// GET FILE NAME INPUT FROM <input> OF CURRENT SELECTED ANSWER //
		/////////////////////////////////////////////////////////////////

		// <label> for="answerFileName"
		const TxtAnswerLabelFileName = TxtAnswerFormChildren[2];
		// <label> for="answerFileName" children
		const TxtAnswerLabelFileNameChildren =  TxtAnswerLabelFileName.children;
		// <input> id="answerFileName"
		const TxtAnswerInputElement = TxtAnswerLabelFileNameChildren[0];

		// <input> User Input Filename Value
		const TxtAnswerFilenameInputValue = TxtAnswerInputElement.value;
		// console.log("TxtAnswerFilenameInputValue: " + TxtAnswerFilenameInputValue);


		////////////////////////////////////////////////////////////////////////////////////////////
		// IF BOTH <textarea> ANSWER AND FILENAME <input> ARE NOT NULL, RUN THE DOWNLOAD FUNCTION //
		////////////////////////////////////////////////////////////////////////////////////////////

		// If the learner input an answer for the <textarea> and specified a file in in the <input> then run the download file function
		if (TxtAnswerFilenameInputValue && TxtAnswerTextAreaInputValue) {
			downloadTxtAnswerFile(TxtAnswerQuestionTitleValue, TxtAnswerTextAreaInputValue, TxtAnswerFilenameInputValue);
		}

	});



	//////////////////////////////
	// DOWNLOAD ANSWER FUNCTION //
	//////////////////////////////

	function downloadTxtAnswerFile(questionTitle, textAnswerContent, filename) {

		const content = questionTitle + "\r\n" + "\r\n" + textAnswerContent;

		const filenameWithExtension = filename + ".txt";

		// It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
		const TxtAnswerAnchorElement = document.createElement('a');

		// A blob is a data type that can store binary data
		// "type" is a MIME type
		// It can have a different value, based on a file you want to save
		const TxtAnswerBlob = new Blob([content], { type: 'plain/text' });

		// createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
		const TxtAnswerFileUrl = URL.createObjectURL(TxtAnswerBlob);

		// setAttribute() Sets the value of an attribute on the specified element.
		TxtAnswerAnchorElement.setAttribute('href', TxtAnswerFileUrl); // file location
		TxtAnswerAnchorElement.setAttribute('download', filenameWithExtension); // file name
		TxtAnswerAnchorElement.style.display = 'none';

		// use appendChild() method to move an element from one element to another
		document.body.appendChild(TxtAnswerAnchorElement);
		TxtAnswerAnchorElement.click();

		// The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
		document.body.removeChild(TxtAnswerAnchorElement);

	}



});




