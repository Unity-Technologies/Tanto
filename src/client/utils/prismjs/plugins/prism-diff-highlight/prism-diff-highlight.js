/*eslint-disable */

(function() {

if (typeof self === 'undefined' || !self.Prism || !self.document) {
	return;
}

function unifiedMarkup(codeLine, operation, cssClass){
	var codeBreak = cssClass === 'code-break' ? ' code-break-line ' : '';
	return '<tr class="code-line' + codeBreak + '">'+
							'<td class="' + cssClass +' line-number-old"></td>'+
							'<td class="' + cssClass + ' line-number-new"></td>'+
							'<td class="' + cssClass +' diff-operation">' + operation + '</td>'+
							'<td class="' + cssClass +' code-inner">'+
								'<span>' + codeLine + '</span>'+
							'</td>'+
						'</tr>';
}

function splitMarkup(oldLine, newLine){
	var codeBreak = oldLine.cssClass === 'code-break' ? ' code-break-line ' : '';
	return '<tr class="code-line' + codeBreak + '">'+
						'<td class="' + oldLine.cssClass +' line-number-old"></td>'+
						'<td class="' + oldLine.cssClass +' diff-operation">' + oldLine.operation + '</td>'+
						'<td class="' + oldLine.cssClass +' code-inner">'+
							'<span>' + oldLine.line + '</span>'+
						'</td>'+
						'<td class="' + newLine.cssClass + ' line-number-new"></td>'+
						'<td class="' + newLine.cssClass +' diff-operation">' + newLine.operation + '</td>'+
						'<td class="' + newLine.cssClass +' code-inner">'+
							'<span>' + newLine.line + '</span>'+
						'</td>'+
					'</tr>';
}

function getUnifiedDiffHtml(codeLines){
	var addedOperator = '<span class="token operator">+</span>';
	var removedOperator = '<span class="token operator">-</span>';
	var newLines = [],
			oldNum = 0,
			newNum = 0,
			rowClass = '',
			operation = '',
			line = '';

	var arrayLength = codeLines.length;
	for (var i = 0; i < arrayLength; i++) {
		line = operation = '';
		line = codeLines[i];
		rowClass = '';
		oldNum = 0;
		newNum = 0;

		// assume that only the fist three lines can be present as diff header
		if (i <= 2) {
			var cleared = line.replace(/<\/?[\w\s="/.':;#-\/\?]+>/gi, '');
			if (cleared.match(/^(?:\*{3}|-{3}|\+{3}|diff\s\-{2}git).*$/m)){
				continue;
			}
		}

		if (line.startsWith(addedOperator)){
			line = line.slice(addedOperator.length);
			operation = '<span> + </span>'
			rowClass = 'line-added';
		}
		else if (line.startsWith(removedOperator)) {
			line = line.slice(removedOperator.length);
			operation = '<span> - </span>'
			rowClass = 'line-removed';
		}
		else if (line.match(/^(\@\@)/i)) {
			rowClass = 'code-break';
		}
		else {
			rowClass = 'line-common';
		}

		newLines.push(unifiedMarkup(line, operation, rowClass));
	}

 return '<table class="code-block diff-unified">' + newLines.join('\n') + '</table>';
}

function getSideBySideDiffHtml(codeLines){
	var addedOperator = '<span class="token operator">+</span>';
	var removedOperator = '<span class="token operator">-</span>';
	var newLines = [],
			oldLines = [],
			newMarkup = [],
			line = '';

	var arrayLength = codeLines.length;
	for (var i = 0; i < arrayLength; i++) {
		line = codeLines[i];

		// assume that only the fist three lines can be present as diff header
		if (i <= 2) {
			var cleared = line.replace(/<\/?[\w\s="/.':;#-\/\?]+>/gi, '');
			if (cleared.match(/^(?:\*{3}|-{3}|\+{3}|diff\s\-{2}git).*$/m)){
				continue;
			}
		}

		if (line.startsWith(addedOperator)){
			line = line.slice(addedOperator.length);
			newLines.push({
				line: line,
				operation: '<span> + </span>',
				cssClass: 'line-added'
			})
		}
		else if (line.startsWith(removedOperator)) {
			line = line.slice(removedOperator.length);
			oldLines.push({
				line: line,
				operation: '<span> - </span>',
				cssClass: 'line-removed'
			})
		}
		else if (line.match(/^(\@{2})/i)) {
			var lineBreak = {
				line: line,
				operation: '',
				cssClass: 'code-break'
			}
			oldLines.push(lineBreak);
			newLines.push(lineBreak);
		}
		else {
			var lineCommon = {
				line: line,
				operation: '',
				cssClass: 'line-common'
			}
			oldLines.push(lineCommon);
			newLines.push(lineCommon);
		}
	}

	var oldLinesLength = oldLines.length;
	var newLinesLength = newLines.length;
	var gapLength = Math.abs(oldLinesLength - newLinesLength);
	var target = oldLinesLength > newLinesLength ? newLines : oldLines;
	for (var p = 0; p < gapLength; p++){
		target.push({ line: '', operation: '', cssClass: 'code-empty'});
	}

	for (var k = 0; k < oldLines.length; k++){
		var splitLine = splitMarkup(oldLines[k], newLines[k])
		newMarkup.push(splitLine);
	}

 	return '<table class="code-block diff-split">' + newMarkup.join('\n') + '</table>';
}

Prism.hooks.add('complete', function (env) {
	if (!env.code) {
		return;
	}
	var pre = env.element.parentNode;

	if (!pre || !/pre/i.test(pre.nodeName)) {
		return;
	}

	if (env.element.children.length === 0 || (env.element.children.length === 1 && env.element.children[0].nodeName === 'TABLE')) {
		return
	}

	var diffType = pre.hasAttribute('data-diff-type') ? pre.getAttribute('data-diff-type') : '0';

	// Row diff view
	if(diffType === '2') {
		env.element.innerHTML = '<div class="row-diff">' + env.element.innerHTML + '</div>';
		return;
	}

	var codeLines = env.element.innerHTML.split('\n');

	env.element.innerHTML = diffType === '0' ? getUnifiedDiffHtml(codeLines) : getSideBySideDiffHtml(codeLines);

	var breaks = env.code.match(/\n?\@\@\s\-(\d+),\d+\s\+(\d+),\d+\s\@\@/g);
	var breakLine = env.element.getElementsByClassName('code-break-line');

	var breaksLength = breaks.length;
	for(var i = 0; i < breaksLength; i++) {
		var oldNum, newNum;
		oldNum = newNum = 0;
		var breakPortion = breaks[i];
		var groups = breakPortion.match(/\n?\@\@\s\-(\d+),\d+\s\+(\d+),\d+\s\@\@/m);
		if (groups.length === 3){
			oldNum = parseInt(groups[1], 10) - 1;
			newNum = parseInt(groups[2], 10) - 1;
		}
		breakLine[i].style.counterReset = 'oldlinenumber ' + oldNum + ' newlinenumber ' + newNum;
 	}
});
}());
