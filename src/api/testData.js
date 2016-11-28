/*eslint-disable */
/**
 * This must be removed
 */

export const projectFilesTestData = [{
  name: 'apps',
  id: 'sdjfl',
  size: '7.7KB',
  updated: 'yesterday',
  commitmessage: 'changes slkjdfl  lsaj',
  revision: '	13ecb99c2903',
  author: 'kate',
  children: [{
    name: 'core',
    id: 'sdjfl1',
    size: '1KB',
    updated: 'yesterday',
    commitmessage: 'changes slkjdfl  lsaj',
    revision: '	13ecb99c2903',
    author: 'kate',
    children: [{
      name: 'admin.py',
      id: 'sdjfl2',
      size: '3KB',
      updated: 'yesterday',
      commitmessage: 'changes slkjdfl  lsaj',
      revision: '	13ecb99c2903',
      author: 'kate',
    }],
  }],
},
  {
    name: 'core',
    id: 'sdjfl4',
    size: '7.7KB',
    updated: 'yesterday',
    commitmessage: 'changes slkjdfl  lsaj',
    revision: '	13ecb99c2903',
    author: 'kate',
    children: [{
      name: 'core',
      id: 'sdjfl5',
      size: '1KB',
      updated: 'yesterday',
      commitmessage: 'changes slkjdfl  lsaj',
      revision: '	13ecb99c2903',
      author: 'kate',
      children: [{
        name: 'admin2.py',
        id: 'sdjfl6',
        size: '3KB',
        updated: 'yesterday',
        commitmessage: 'changes slkjdfl  lsaj',
        revision: '	13ecb99c2903',
        author: 'kate',
      },
        {
          name: 'core.py',
          id: 'sdjfl7',
          commitmessage: 'changes slkjdfl  lsaj',
          size: '3KB',
          updated: 'yesterday',
          revision: '	13ecb99c2903',
          author: 'kate',
        },
      ],
    }],
  },
  {
    name: 'data',
    id: 'sdjfl18',
    size: '7.7KB',
    updated: 'yesterday',
    commitmessage: 'changes slkjdfl  lsaj',
    revision: '	13ecb99c2903',
    author: 'kate',
    children: [{
      name: 'core',
      size: '1KB',
      updated: 'yesterday',
      commitmessage: 'changes slkjdfl  lsaj',
      revision: '	13ecb99c2903',
      author: 'kate',
      children: [{
        name: 'admin3.py',
        size: '3KB',
        id: 'sdjfl8',
        commitmessage: 'changes slkjdfl  lsaj',
        updated: 'yesterday',
        revision: '	13ecb99c2903',
        author: 'kate',
      },
        {
          name: 'admin2.py',
          id: 'sdjfl9',
          size: '3KB',
          commitmessage: 'changes slkjdfl  lsaj',
          updated: 'yesterday',
          revision: '	13ecb99c2903',
          author: 'kate',
        },
      ],
    }],
  },
  {
    name: 'readme.py',
    size: '3KB',
    updated: 'yesterday',
    id: 'sdjfl10',
    commitmessage: 'changes slkjdfl  lsaj',
    revision: '	13ecb99c2903',
    author: 'kate',
  },
]

export const changelogTestData = [{
  hash: 'cfb91a5909d1',
  author: 'kate',
  message: 'Update slave group',
  date: '1 day ago',
  
}, {
  hash: 'cfb91a5909d2',
  user: 'kate',
  commitmessage: 'Added branch scheduler for katana staging branch',
  date: '3 day ago',
  avatar: '',
}, {
  hash: 'dd00475c4523',
  user: 'maria',
  commitmessage: 'Merge staging to default',
  date: '13 day ago',
  avatar: '',
}, {
  hash: 'cfb91a5909d4',
  user: 'kate2',
  commitmessage: 'Convert to new scheduling',
  date: '21 day ago',
  avatar: '',
}, {
  hash: 'cfb91a5909d5',
  user: 'john',
  commitmessage: 'Update slave group',
  date: '1 month ago',
  avatar: '',
}]


export const status = [
  { value: 1, label: 'rejected' },
  { value: 2, label: 'approved' },
  { value: 3, label: 'issue' },
  { value: 4, label: 'closed' },
  { value: 5, label: 'new' },
]

export const sort = [
  { value: 1, label: 'Creation date' },
  { value: 2, label: 'Last update date' },
  { value: 3, label: 'Changes size' },
  { value: 4, label: 'Comments number' },
  { value: 5, label: 'Builds number' },
  { value: 6, label: 'Reviewers number' },
  { value: 7, label: 'Versions number' },
]

export const users = [
  { value: 1, label: 'Soren' },
  { value: 2, label: 'Kate' },
  { value: 3, label: 'Mads' },
  { value: 4, label: 'NaTosha' },
  { value: 5, label: 'Henrik' },
]

export const changesets = [
  { value: 1, label: '13ecb99c2903' },
  { value: 2, label: '13ecb99c2904' },
  { value: 3, label: '13ecb99c2905' },
  { value: 4, label: '13ecb99c2906' },
  { value: 5, label: '13ecb99c2907' },
]

export const reviewers = [
  { value: 'Soren', label: 'Soren' },
  { value: 'Kate', label: 'Kate' },
  { value: 'Mads', label: 'Mads' },
  { value: 'Alex', label: 'Alex' },
  { value: 'NaTosha', label: 'NaTosha' },
  { value: 'Henrik', label: 'Henrik' },
  { value: 'Bob', label: 'Bob' },
  { value: 'John', label: 'John' },
]


export const files = [
  { name: 'core/data/readme.rst', metadata: {} },
  { name: 'core/data/list/list.cs', metadata: {} },
  { name: 'database/tests/list_test.cs', metadata: {} },
  { name: 'test/core/list/paper.cs', metadata: {} },
  { name: 'test/database/list/paper.cs', metadata: {} },
]

export const branches = [
  { value: 1, label: 'default' },
  { value: 2, label: '5.3/devs/default' },
  { value: 3, label: '5.3/devs/feature1/feature' },
  { value: 4, label: '5.3/devs/feature2' },
  { value: 5, label: '5.3/devs/feature3' },
  { value: 6, label: '5.3/devs/feature4' },
]

export const mentions = [{
  name: 'matthew',
  avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
},
  {
    name: 'julian',
    avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png',
  },
  {
    name: 'jyoti',
    avatar: 'https://pbs.twimg.com/profile_images/705714058939359233/IaJoIa78_400x400.jpg',
  },
  {
    name: 'max',
    avatar: 'https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_400x400.jpg',
  },
  {
    name: 'nik',
    avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
  },
  {
    name: 'pascal',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
]


export const prDescription = `Lorem Ipsum is simply dummy text of the
printing and typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown printer t
ook a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic
typesetting, remaining essentially unchanged. It was popularised in the
1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker
including versions of Lorem Ipsum.`

export const codeJS = `
import fetch from 'isomorphic-fetch'

import urljoin from 'url-join'

import config from '../config'

/**
 * Returns correctly formatted API url. If calls on SERVER then url prepended
 * with the real api server url(from the config). Otherwise returns url to NODE api
 * server proxy.
 * @return {[type]}     [description]
 */
export const getGraphQLApiHost = () => {
  if (__SERVER__) {
    return urljoin(config.apiUrl, '/graphql')
  }
  // thats NODE proxy server endpoint - NOT the API server endpoint
  return urljoin(config.apiProxy, '/graphql')
}

/**
 * Fetches the data. Data object has the same format as 'fetch' accepts
 * @param  {[type]} query  [description]
 * @return {[type]}      [description]
 */
export default function callApi(query) {
  const encodedQuery = encodeURIComponent(query)
  return fetch(urljoin(getGraphQLApiHost(), ''))
}
`
export const codeHtml = `<!DOCTYPE html>
<html lang="en">
<head>

<script>
	// Just a lil’ script to show off that inline JS gets highlighted
	window.console && console.log('foo');
</script>
<meta charset="utf-8" />
<link rel="shortcut icon" href="favicon.png" />
<title>Prism</title>
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="themes/prism.css" data-noprefix />
<script src="prefixfree.min.js"></script>

<script>var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];</script>
<script src="https://www.google-analytics.com/ga.js" async></script>
</head>
<body>`

export const codeCpp = `

void StackLinkedList::destroyList()
{
   while(front != NULL)
   {
       NODE *temp = front;
       front = front->N;
       delete temp;
   }
}`

export const codeCSharp = `using System.Windows.Forms;
using System.Drawing;

public static DialogResult InputBox(string title, string promptText, ref string value)
{
  Form form = new Form();
  Label label = new Label();
  TextBox textBox = new TextBox();
  Button buttonOk = new Button();
  Button buttonCancel = new Button();

  form.Text = title;
  label.Text = promptText;
  textBox.Text = value;

  buttonOk.Text = "OK";
  buttonCancel.Text = "Cancel";
  buttonOk.DialogResult = DialogResult.OK;
  buttonCancel.DialogResult = DialogResult.Cancel;

  label.SetBounds(9, 20, 372, 13);
  textBox.SetBounds(12, 36, 372, 20);
  buttonOk.SetBounds(228, 72, 75, 23);
  buttonCancel.SetBounds(309, 72, 75, 23);

  label.AutoSize = true;
  textBox.Anchor = textBox.Anchor | AnchorStyles.Right;
  buttonOk.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
  buttonCancel.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;

  form.ClientSize = new Size(396, 107);
  form.Controls.AddRange(new Control[] { label, textBox, buttonOk, buttonCancel });
  form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);
  form.FormBorderStyle = FormBorderStyle.FixedDialog;
  form.StartPosition = FormStartPosition.CenterScreen;
  form.MinimizeBox = false;
  form.MaximizeBox = false;
  form.AcceptButton = buttonOk;
  form.CancelButton = buttonCancel;

  DialogResult dialogResult = form.ShowDialog();
  value = textBox.Text;
  return dialogResult;
}`


export const codeCss = `
pre[class*="language-"] {
	color: black;
	background: none;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

`

export const codeJsx = `
var ExampleApplication = React.createClass({
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';

      return <p>{message}</p>;
    }
  });
  var start = new Date().getTime();
  setInterval(function() {
    React.render(
      <ExampleApplication elapsed={new Date().getTime() - start} />,
      document.getElementById('container')
    );
  }, 50);`

export const codeDiff1 =` #include "VirtualJoystickManager.h"
 #include "Runtime/Testing/Faking.h"

+class VirtualJoystickProperties
+{
+public:
+	VirtualJoystickProperties(const std::string &name, bool connected)
+	{
+		m_Name = name;
+		m_Connected = connected;
+	}
+
+	std::string m_Name;
+	bool m_Connected;
+
{
  if (connect)
  {
-			m_VirtualJoysticks.push_back(name);
+			m_VirtualJoysticks.push_back(new VirtualJoystickProperties(name, true));
    index = m_VirtualJoysticks.size() - 1;
  }
  else
@@ -77,9 +121,20 @@
void VirtualJoystickManager::UpdatePhysi
}
}
+private:
+	// Force the default constructor to be unused
+	VirtualJoystickProperties() {}
+};
+`

export const codeDiff2 =` #include "VirtualJoystickManager.h"
 #include "Runtime/Testing/Faking.h"

+class VirtualJoystickProperties
+{
+public:
+	VirtualJoystickProperties(const std::string &name, bool connected)
-	{
-		m_Name = name;
-		m_Connected = connected;
-	}
-
//
// This class implements functionality related to virtual joysticks. It is instantiated
// as a singleton inside of Runtime/Input/GetInput.cpp and that singleton can be interacted
// with via functions defined in Runtime/Input/GetInput.h. It is only factored out separately
// here for the sake of testability. DO NOT instantiate one of these outside of a test.
//
+	std::string m_Name;
+	bool m_Connected;
+
+private:
+	// Force the default constructor to be unused
+	VirtualJoystickProperties() {}
+};
+`

export const codeDiff = `
@@ -5,12 +5,42 @@
 #include "VirtualJoystickManager.h"
 #include "Runtime/Testing/Faking.h"

+class VirtualJoystickProperties
+{
+public:
+	VirtualJoystickProperties(const std::string &name, bool connected)
+	{
+		m_Name = name;
+		m_Connected = connected;
+	}
+

+	std::string m_Name;
+	bool m_Connected;
+
+private:
+	// Force the default constructor to be unused
+	VirtualJoystickProperties() {}
+};
+
 //
 // This class implements functionality related to virtual joysticks. It is instantiated
 // as a singleton inside of Runtime/Input/GetInput.cpp and that singleton can be interacted
 // with via functions defined in Runtime/Input/GetInput.h. It is only factored out separately
 // here for the sake of testability. DO NOT instantiate one of these outside of a test.
 //
+VirtualJoystickManager::VirtualJoystickManager() :
+    m_LastJoystickQueryTime(-2.0f)
+{
+}
+
+VirtualJoystickManager::~VirtualJoystickManager()
+{
+	for (std::vector<VirtualJoystickProperties*>::iterator it = m_VirtualJoysticks.begin(); it != m_VirtualJoysticks.end(); ++it)
+	{
+		delete (*it);
+	}
+}
+
 int VirtualJoystickManager::ConnectVirtualJoystick(const char *name)
 {
 	return ConnectOrLookupVirtualJoystick(name, true);
@@ -21,10 +51,16 @@

int VirtualJoystickManager::GetVirtualJo
 	return ConnectOrLookupVirtualJoystick(name, false);
 }

-void VirtualJoystickManager::GetVirtualJoystickNames(std::vector<std::string> &names)
+void VirtualJoystickManager::GetVirtualJoystickNames(std::vector<std::string> &names) const
 {
 	names.clear();
-	names.insert(names.end(), m_VirtualJoysticks.begin(), m_VirtualJoysticks.end());
+
+	for (std::vector<VirtualJoystickProperties*>::const_iterator it = m_VirtualJoysticks.begin(); it != m_VirtualJoysticks.end(); ++it)
+	{
+		// If a joystick is disconnected we maintain its slot but return a blank name. This is at parity with the behavior of
+		// disconnected physical joysticks
+		names.push_back((*it)->m_Connected ? (*it)->m_Name : "");
+	}
 }

 int VirtualJoystickManager::ConnectOrLookupVirtualJoystick(const char *name, bool connect)
@@ -35,7 +71,15 @@

int VirtualJoystickManager::ConnectOrLoo
 	}

 	// Look in the list for an existing virtual joystick with this name
-	std::vector<std::string>::const_iterator it = std::find(m_VirtualJoysticks.begin(), m_VirtualJoysticks.end(), name);
+	std::vector<VirtualJoystickProperties*>::const_iterator it;
+	for (it = m_VirtualJoysticks.begin(); it != m_VirtualJoysticks.end(); ++it)
+	{
+		if (name == (*it)->m_Name)
+		{
+			break;
+		}
+	}
+

 	int index;

@@ -48,7 +92,7 @@

int VirtualJoystickManager::ConnectOrLoo
 	{
 		if (connect)
 		{
-			m_VirtualJoysticks.push_back(name);
+			m_VirtualJoysticks.push_back(new VirtualJoystickProperties(name, true));
 			index = m_VirtualJoysticks.size() - 1;
 		}
 		else
@@ -77,9 +121,20 @@

void VirtualJoystickManager::UpdatePhysi
 	}
 }

-void VirtualJoystickManager::GetPhysicalJoystickNames(std::vector<std::string> &names)
+void VirtualJoystickManager::GetPhysicalJoystickNames(std::vector<std::string> &names) const
 {
 	__FAKEABLE_METHOD__ (VirtualJoystickManager, GetPhysicalJoystickNames, (names));

 	::GetJoystickNames(names);
 }
+
+void VirtualJoystickManager::SetVirtualJoystickConnectedState(const char *name, bool connected)
+{
+	for (std::vector<VirtualJoystickProperties*>::iterator it = m_VirtualJoysticks.begin(); it != m_VirtualJoysticks.end(); ++it)
+	{
+		if (name == (*it)->m_Name)
+		{
+			(*it)->m_Connected = connected;
+		}
+	}
+}`
export const diff1 = `
diff --git a/Editor/Mono/EditorGUI.cs b/Editor/Mono/EditorGUI.cs
--- a/Editor/Mono/EditorGUI.cs
+++ b/Editor/Mono/EditorGUI.cs
@@ -5244,7 +5244,7 @@ This warning only shows up in developmen
 			case SerializedPropertyType.Gradient:
 			{
 				int id = GUIUtility.GetControlID (s_CurveHash, FocusType.Keyboard, position);
-				EditorGUI.DoGradientField (PrefixLabel (position, id, label), id, null, property);
+				EditorGUI.DoGradientField (PrefixLabel (position, id, label), id, null, property, false);
 				break;
 			}
 			case SerializedPropertyType.Vector3:`

export const diff2 = `diff --git a/Editor/Mono/GUI/GradientField.cs b/Editor/Mono/GUI/GradientField.cs
--- a/Editor/Mono/GUI/GradientField.cs
+++ b/Editor/Mono/GUI/GradientField.cs
@@ -9,38 +9,38 @@ namespace UnityEditor
 		internal static Gradient GradientField(Gradient value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(EditorGUIUtility.fieldWidth, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(r, value);
+			return EditorGUI.GradientField(r, value, false);
 		}

 		internal static Gradient GradientField(string label, Gradient value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(kLabelFloatMinW, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(label, r, value);
+			return EditorGUI.GradientField(label, r, value, false);
 		}

 		internal static Gradient GradientField(GUIContent label, Gradient value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(kLabelFloatMinW, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(label, r, value);
+			return EditorGUI.GradientField(label, r, value, false);
 		}

 		// SerializedProperty versions
 		internal static Gradient GradientField(SerializedProperty value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(kLabelFloatMinW, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(r, value);
+			return EditorGUI.GradientField(r, value, false);
 		}

 		internal static Gradient GradientField(string label, SerializedProperty value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(kLabelFloatMinW, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(label, r, value);
+			return EditorGUI.GradientField(label, r, value, false);
 		}

 		internal static Gradient GradientField(GUIContent label, SerializedProperty value, params GUILayoutOption[] options)
 		{
 			Rect r = s_LastRect = GUILayoutUtility.GetRect(kLabelFloatMinW, kLabelFloatMaxW, EditorGUI.kSingleLineHeight, EditorGUI.kSingleLineHeight, EditorStyles.colorField, options);
-			return EditorGUI.GradientField(label, r, value);
+			return EditorGUI.GradientField(label, r, value, false);
 		}
 	}

@@ -51,42 +51,42 @@ namespace UnityEditor
 		static int s_GradientID;

 		// Gradient versions
-		internal static Gradient GradientField(Rect position, Gradient gradient)
+		internal static Gradient GradientField(Rect position, Gradient gradient, bool list)
 		{
 			int id = EditorGUIUtility.GetControlID(s_GradientHash, FocusType.Keyboard, position);
-			return DoGradientField(position, id, gradient, null);
+			return DoGradientField(position, id, gradient, null, list);
 		}

-		internal static Gradient GradientField(string label, Rect position, Gradient gradient)
+		internal static Gradient GradientField(string label, Rect position, Gradient gradient, bool list)
 		{
-			return GradientField(EditorGUIUtility.TempContent(label), position, gradient);
+			return GradientField(EditorGUIUtility.TempContent(label), position, gradient, list);
 		}

-		internal static Gradient GradientField(GUIContent label, Rect position, Gradient gradient)
+		internal static Gradient GradientField(GUIContent label, Rect position, Gradient gradient, bool list)
 		{
 			int id = EditorGUIUtility.GetControlID(s_GradientHash, FocusType.Keyboard, position);
-			return DoGradientField(PrefixLabel(position, id, label), id, gradient, null);
+			return DoGradientField(PrefixLabel(position, id, label), id, gradient, null, list);
 		}

 		// SerializedProperty versions
-		internal static Gradient GradientField(Rect position, SerializedProperty gradient)
+		internal static Gradient GradientField(Rect position, SerializedProperty gradient, bool list)
 		{
 			int id = EditorGUIUtility.GetControlID(s_GradientHash, FocusType.Keyboard, position);
-			return DoGradientField(position, id, null, gradient);
+			return DoGradientField(position, id, null, gradient, list);
 		}

-		internal static Gradient GradientField(string label, Rect position, SerializedProperty property)
+		internal static Gradient GradientField(string label, Rect position, SerializedProperty property, bool list)
 		{
-			return GradientField(EditorGUIUtility.TempContent(label), position, property);
+			return GradientField(EditorGUIUtility.TempContent(label), position, property, list);
 		}

-		internal static Gradient GradientField(GUIContent label, Rect position, SerializedProperty property)
+		internal static Gradient GradientField(GUIContent label, Rect position, SerializedProperty property, bool list)
 		{
 			int id = EditorGUIUtility.GetControlID(s_GradientHash, FocusType.Keyboard, position);
-			return DoGradientField(PrefixLabel(position, id, label), id, null, property);
+			return DoGradientField(PrefixLabel(position, id, label), id, null, property, list);
 		}

-		internal static Gradient DoGradientField (Rect position, int id, Gradient value, SerializedProperty property)
+		internal static Gradient DoGradientField (Rect position, int id, Gradient value, SerializedProperty property, bool list)
 		{
 			Event evt = Event.current;

@@ -100,7 +100,7 @@ namespace UnityEditor
 							s_GradientID = id;
 							GUIUtility.keyboardControl = id;
 							Gradient gradient = property != null ? property.gradientValue : value;
-							GradientPicker.Show(gradient);
+							GradientPicker.Show(gradient, list);
 							GUIUtility.ExitGUI();
 						}
 						else if (evt.button == 1)
@@ -115,9 +115,9 @@ namespace UnityEditor
 					{
 						Rect r2 = new Rect(position.x +1, position.y + 1, position.width - 2, position.height - 2); // Adjust for box drawn on top
 						if (property != null)
-							GradientEditor.DrawGradientSwatch(r2, property, Color.white);
+							GradientEditor.DrawGradientSwatch(r2, property, Color.white, list);
 						else
-							GradientEditor.DrawGradientSwatch(r2, value, Color.white);
+							GradientEditor.DrawGradientSwatch(r2, value, Color.white, list);
 						EditorStyles.colorPickerBox.Draw(position, GUIContent.none, id);
 						break;
 					}
@@ -147,7 +147,7 @@ namespace UnityEditor
 					{
 						Event.current.Use();
 						Gradient gradient = property != null ? property.gradientValue : value;
-						GradientPicker.Show(gradient);
+						GradientPicker.Show(gradient, list);
 						GUIUtility.ExitGUI();
 					}
 					break;`


export const textLoremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing
elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit `
