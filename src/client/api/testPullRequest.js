// FIXME: enable flow!!!
/*eslint-disable */

/**
 * Data from PR https://ono.unity3d.com/unity/unity/pull-request/28986
 */

const file1 = `@@ -5244,7 +5244,7 @@ This warning only shows up in developmen
 			case SerializedPropertyType.Gradient:
 			{
 				int id = GUIUtility.GetControlID (s_CurveHash, FocusType.Keyboard, position);
-				EditorGUI.DoGradientField (PrefixLabel (position, id, label), id, null, property);
+				EditorGUI.DoGradientField (PrefixLabel (position, id, label), id, null, property, false);
 				break;
 			}
 			case SerializedPropertyType.Vector3:`

const file2 = `@@ -52,12 +52,14 @@ internal class GradientEditor
 	Swatch m_SelectedSwatch;
 	Gradient m_Gradient;
 	int m_NumSteps;
+	bool m_List;

 	// Fixed steps are only used if numSteps > 1
-	public void Init (Gradient gradient, int numSteps)
+	public void Init (Gradient gradient, int numSteps, bool list)
 	{
 		m_Gradient = gradient;
 		m_NumSteps = numSteps;
+		m_List = list;

 		BuildArrays();

@@ -70,7 +72,6 @@ internal class GradientEditor
 		get { return m_Gradient; }
 	}

-
 	float GetTime (float actualTime)
 	{
 		actualTime = Mathf.Clamp01(actualTime);
@@ -91,7 +92,7 @@ internal class GradientEditor
 	void BuildArrays()
 	{
 		if (m_Gradient == null)
-				return;
+			return;
 		GradientColorKey[] colorKeys = m_Gradient.colorKeys;
 		m_RGBSwatches = new List<Swatch>(colorKeys.Length);
 		for (int i = 0; i < colorKeys.Length; i++)
@@ -132,91 +133,152 @@ internal class GradientEditor
 		if (s_Styles == null)
 			s_Styles = new Styles();

-		float swatchHeight = 16f;
-		float editSectionHeight = 30f;
-		float gradientTextureHeight = position.height - 2 * swatchHeight - editSectionHeight;
-
-		position.height = swatchHeight;
-
-		// Alpha swatches (no idea why they're top, but that's what Adobe & Apple seem to agree on)
-		ShowSwatchArray (position, m_AlphaSwatches, true);
-
-		// Gradient texture
-		position.y += swatchHeight;
-		if (Event.current.type == EventType.Repaint)
-		{
-			position.height = gradientTextureHeight;
-			DrawGradientWithBackground (position, GradientPreviewCache.GetGradientPreview(m_Gradient));
-		}
-		position.y += gradientTextureHeight;
-		position.height = swatchHeight;
-
-		// Color swatches (bottom)
-		ShowSwatchArray(position, m_RGBSwatches, false);
-
-		if (m_SelectedSwatch != null)
+		if (m_List)
 		{
-			position.y += swatchHeight;
-			position.height = editSectionHeight;
-			position.y += 10;
-
-			float locationWidth = 45;
-			float locationTextWidth = 60;
-			float space = 20;
-			float alphaOrColorTextWidth = 50;
-			float totalLocationWidth = locationTextWidth + space + locationTextWidth + locationWidth;
+			GUILayout.Space(16);
+			const float kColumnWidth = 130.0f;
+			for (int i = 0; i < m_RGBSwatches.Count; i++)
+			{
+				if (i % 2 == 0)
+					GUILayout.BeginHorizontal();

-			// Alpha or Color field
-			Rect rect = position;
-			rect.height = 18;
-			rect.x += 17;
-			rect.width -= totalLocationWidth;
-			EditorGUIUtility.labelWidth = alphaOrColorTextWidth;
-			if (m_SelectedSwatch.m_IsAlpha)
+				GUILayout.BeginHorizontal(GUILayout.Width(kColumnWidth));
+				GUILayout.Space(10);
+				Color c = m_RGBSwatches[i].m_Value;
+				c.a = m_AlphaSwatches[i].m_Value.a;
+				EditorGUI.BeginChangeCheck();
+				c = EditorGUILayout.ColorField(c);
+				m_RGBSwatches[i].m_Value = c;
+				m_AlphaSwatches[i].m_Value.a = c.a;
+
+				using (new EditorGUI.DisabledScope(m_RGBSwatches.Count == 1))
+				{
+					if (GUILayout.Button("X", EditorStyles.toolbarButton, GUILayout.Width(16)))
+					{
+						m_RGBSwatches.RemoveAt(i);
+						m_AlphaSwatches.RemoveAt(i);
+					}
+				}
+				GUILayout.Space(10);
+				GUILayout.EndHorizontal();
+
+				if (i % 2 == 1)
+					GUILayout.EndHorizontal();
+			}
+
+
+			if (m_RGBSwatches.Count < k_MaxNumKeys)
 			{
-				EditorGUIUtility.fieldWidth = 30;
-				EditorGUI.BeginChangeCheck();
-				float sliderValue = EditorGUI.IntSlider (rect, s_Styles.alphaText, (int)(m_SelectedSwatch.m_Value.r * 255), 0, 255) / 255f;
-				if (EditorGUI.EndChangeCheck())
+				GUILayout.BeginHorizontal(GUILayout.Width(kColumnWidth));
+				GUILayout.Space(10);
+				if (GUILayout.Button("+", EditorStyles.toolbarButton, GUILayout.Width(16)))
 				{
-					sliderValue = Mathf.Clamp01(sliderValue);
-					m_SelectedSwatch.m_Value.r = m_SelectedSwatch.m_Value.g = m_SelectedSwatch.m_Value.b = sliderValue;
-					AssignBack();
+					m_RGBSwatches.Add(new Swatch(m_RGBSwatches.Count, Color.white, false));
+					m_AlphaSwatches.Add(new Swatch(m_AlphaSwatches.Count, Color.white, true));
+					AssignBack(false);
 					HandleUtility.Repaint();
 				}
-			}
-			else
-			{
-				EditorGUI.BeginChangeCheck();
-				m_SelectedSwatch.m_Value = EditorGUI.ColorField (rect, s_Styles.colorText, m_SelectedSwatch.m_Value, true, false);
-				if (EditorGUI.EndChangeCheck())
-				{
-					AssignBack();
-					HandleUtility.Repaint();
-				}
+
+				GUILayout.EndHorizontal();
+
+				if (m_NumSteps % 2 == 1)
+					GUILayout.EndHorizontal();
 			}

-			// Location of key
-			rect.x += rect.width + space;
-			rect.width = locationWidth + locationTextWidth;
-
-			EditorGUIUtility.labelWidth = locationTextWidth;
-			string orgFormatString = EditorGUI.kFloatFieldFormatString;
-			EditorGUI.kFloatFieldFormatString = "f1";
+			if (EditorGUI.EndChangeCheck())
+			{
+				AssignBack(false);
+				HandleUtility.Repaint();
+			}
+		}
+		else
+		{
+			float swatchHeight = 16f;
+			float editSectionHeight = 30f;
+			float gradientTextureHeight = position.height - 2 * swatchHeight - editSectionHeight;

-			EditorGUI.BeginChangeCheck();
-			float newLocation = EditorGUI.FloatField (rect, s_Styles.locationText, m_SelectedSwatch.m_Time * 100.0f) / 100.0f;
-			if (EditorGUI.EndChangeCheck ())
+			position.height = swatchHeight;
+
+			// Alpha swatches (no idea why they're top, but that's what Adobe & Apple seem to agree on)
+			ShowSwatchArray (position, m_AlphaSwatches, true);
+
+			// Gradient texture
+			position.y += swatchHeight;
+			if (Event.current.type == EventType.Repaint)
 			{
-				m_SelectedSwatch.m_Time = Mathf.Clamp(newLocation, 0f, 1f); ;
-				AssignBack ();
+				position.height = gradientTextureHeight;
+				DrawGradientWithBackground (position, GradientPreviewCache.GetGradientPreview(m_Gradient, m_List));
 			}
+			position.y += gradientTextureHeight;
+			position.height = swatchHeight;

-			EditorGUI.kFloatFieldFormatString = orgFormatString;
+			// Color swatches (bottom)
+			ShowSwatchArray(position, m_RGBSwatches, false);
+
+			if (m_SelectedSwatch != null)
+			{
+				position.y += swatchHeight;
+				position.height = editSectionHeight;
+				position.y += 10;

-			rect.x += rect.width;
-			rect.width = 20;
-			GUI.Label(rect, s_Styles.percentText);
+				float locationWidth = 45;
+				float locationTextWidth = 60;
+				float space = 20;
+				float alphaOrColorTextWidth = 50;
+				float totalLocationWidth = locationTextWidth + space + locationTextWidth + locationWidth;
+
+				// Alpha or Color field
+				Rect rect = position;
+				rect.height = 18;
+				rect.x += 17;
+				rect.width -= totalLocationWidth;
+				EditorGUIUtility.labelWidth = alphaOrColorTextWidth;
+				if (m_SelectedSwatch.m_IsAlpha)
+				{
+					EditorGUIUtility.fieldWidth = 30;
+					EditorGUI.BeginChangeCheck();
+					float sliderValue = EditorGUI.IntSlider (rect, s_Styles.alphaText, (int)(m_SelectedSwatch.m_Value.r * 255), 0, 255) / 255f;
+					if (EditorGUI.EndChangeCheck())
+					{
+						sliderValue = Mathf.Clamp01(sliderValue);
+						m_SelectedSwatch.m_Value.r = m_SelectedSwatch.m_Value.g = m_SelectedSwatch.m_Value.b = sliderValue;
+						AssignBack();
+						HandleUtility.Repaint();
+					}
+				}
+				else
+				{
+					EditorGUI.BeginChangeCheck();
+					m_SelectedSwatch.m_Value = EditorGUI.ColorField (rect, s_Styles.colorText, m_SelectedSwatch.m_Value, true, false);
+					if (EditorGUI.EndChangeCheck())
+					{
+						AssignBack();
+						HandleUtility.Repaint();
+					}
+				}
+
+				// Location of key
+				rect.x += rect.width + space;
+				rect.width = locationWidth + locationTextWidth;
+
+				EditorGUIUtility.labelWidth = locationTextWidth;
+				string orgFormatString = EditorGUI.kFloatFieldFormatString;
+				EditorGUI.kFloatFieldFormatString = "f1";
+
+				EditorGUI.BeginChangeCheck();
+				float newLocation = EditorGUI.FloatField (rect, s_Styles.locationText, m_SelectedSwatch.m_Time * 100.0f) / 100.0f;
+				if (EditorGUI.EndChangeCheck ())
+				{
+					m_SelectedSwatch.m_Time = Mathf.Clamp(newLocation, 0f, 1f); ;
+					AssignBack ();
+				}
+
+				EditorGUI.kFloatFieldFormatString = orgFormatString;
+
+				rect.x += rect.width;
+				rect.width = 20;
+				GUI.Label(rect, s_Styles.percentText);
+			}
 		}
 	}

@@ -426,9 +488,10 @@ internal class GradientEditor
 	}

 	// Assign back all swatches, to target gradient.
-	void AssignBack()
+	void AssignBack(bool sort = true)
 	{
-		m_RGBSwatches.Sort((a, b) => SwatchSort(a, b));
+		if(sort)
+			m_RGBSwatches.Sort((a, b) => SwatchSort(a, b));
 		GradientColorKey[] colorKeys = new GradientColorKey[m_RGBSwatches.Count];
 		for (int i = 0; i < m_RGBSwatches.Count; i++)
 		{
@@ -436,7 +499,8 @@ internal class GradientEditor
 			colorKeys[i].time = m_RGBSwatches[i].m_Time;
 		}

-		m_AlphaSwatches.Sort((a, b) => SwatchSort(a, b));
+		if(sort)
+			m_AlphaSwatches.Sort((a, b) => SwatchSort(a, b));
 		GradientAlphaKey[] alphaKeys = new GradientAlphaKey[m_AlphaSwatches.Count];
 		for (int i = 0; i < m_AlphaSwatches.Count; i++)
 		{
@@ -506,17 +570,17 @@ internal class GradientEditor
 	}

 	// GUI Helpers
-	public static void DrawGradientSwatch(Rect position, Gradient gradient, Color bgColor)
+	public static void DrawGradientSwatch(Rect position, Gradient gradient, Color bgColor, bool list)
 	{
-		DrawGradientSwatchInternal(position, gradient, null, bgColor);
+		DrawGradientSwatchInternal(position, gradient, null, bgColor, list);
 	}

-	public static void DrawGradientSwatch(Rect position, SerializedProperty property, Color bgColor)
+	public static void DrawGradientSwatch(Rect position, SerializedProperty property, Color bgColor, bool list)
 	{
-		DrawGradientSwatchInternal(position, null, property, bgColor);
+		DrawGradientSwatchInternal(position, null, property, bgColor, list);
 	}

-	private static void DrawGradientSwatchInternal(Rect position, Gradient gradient, SerializedProperty property, Color bgColor)
+	private static void DrawGradientSwatchInternal(Rect position, Gradient gradient, SerializedProperty property, Color bgColor, bool list)
 	{
 		if (Event.current.type != EventType.Repaint)
 			return;
@@ -539,9 +603,9 @@ internal class GradientEditor
 		// DrawTexture
 		Texture2D preview = null;
 		if (property != null)
-			preview = GradientPreviewCache.GetPropertyPreview(property);
+			preview = GradientPreviewCache.GetPropertyPreview(property, list);
 		else
-			preview = GradientPreviewCache.GetGradientPreview(gradient);
+			preview = GradientPreviewCache.GetGradientPreview(gradient, list);

 		if (preview == null)
 		{
@@ -555,6 +619,4 @@ internal class GradientEditor
 	}
 }

-
-
 } // namespace`

const file3 = `diff --git a/Editor/Mono/GUI/GradientField.cs b/Editor/Mono/GUI/GradientField.cs
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

const file4 = `diff --git a/Editor/Mono/GUI/GradientField.cs b/Editor/Mono/GUI/GradientField.cs
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


const file5 = `diff --git a/Editor/Mono/GUI/GradientPicker.cs b/Editor/Mono/GUI/GradientPicker.cs
--- a/Editor/Mono/GUI/GradientPicker.cs
+++ b/Editor/Mono/GUI/GradientPicker.cs
@@ -15,12 +15,13 @@ internal class GradientPicker : EditorWi
 	[SerializeField]
 	private PresetLibraryEditorState m_GradientLibraryEditorState;
 	private Gradient m_Gradient;
+	private bool m_List;
 	private const int k_DefaultNumSteps = 0;
 	private GUIView m_DelegateView;
 	private bool gradientChanged {get; set;}

 	// Static methods
-	public static void Show(Gradient newGradient)
+	public static void Show(Gradient newGradient, bool list)
 	{
 		GUIView currentView = GUIView.current;
 		if (s_GradientPicker == null)
@@ -38,7 +39,7 @@ internal class GradientPicker : EditorWi
 			s_GradientPicker.Repaint (); // Ensure we get a OnGUI so we refresh if new gradient
 		}
 		s_GradientPicker.m_DelegateView = currentView;
-		s_GradientPicker.Init (newGradient);
+		s_GradientPicker.Init (newGradient, list);
 	}

 	public static GradientPicker instance
@@ -46,7 +47,7 @@ internal class GradientPicker : EditorWi
 		get
 		{
 			if (!s_GradientPicker)
-				Debug.LogError("Gradient Picker not initalized, did you call Show first?");
+				Debug.LogError("Gradient Picker not initialized, did you call Show first?");
 			return s_GradientPicker;
 		}
 	}
@@ -65,11 +66,13 @@ internal class GradientPicker : EditorWi
 		}
 	}

-	private void Init (Gradient newGradient)
+	private void Init (Gradient newGradient, bool list)
 	{
+		titleContent = list ? new GUIContent("Color Editor") : new GUIContent("Gradient Editor");
 		m_Gradient = newGradient;
+		m_List = list;
 		if (m_GradientEditor != null)
-			m_GradientEditor.Init (newGradient, k_DefaultNumSteps);
+			m_GradientEditor.Init (newGradient, k_DefaultNumSteps, list);
 		Repaint ();
 	}

@@ -77,7 +80,7 @@ internal class GradientPicker : EditorWi
 	{
 		m_Gradient.colorKeys = gradient.colorKeys;
 		m_Gradient.alphaKeys = gradient.alphaKeys;
-		Init (m_Gradient);
+		Init (m_Gradient, m_List);
 	}

 	public static bool visible
@@ -127,7 +130,7 @@ internal class GradientPicker : EditorWi
 		if (m_GradientEditor == null)
 		{
 			m_GradientEditor = new GradientEditor();
-			m_GradientEditor.Init (m_Gradient, k_DefaultNumSteps);
+			m_GradientEditor.Init (m_Gradient, k_DefaultNumSteps, m_List);
 		}

 		if (m_GradientLibraryEditorState ==  null)
@@ -142,6 +145,7 @@ internal class GradientPicker : EditorWi
 			m_GradientLibraryEditor = new PresetLibraryEditor<GradientPresetLibrary> (saveLoadHelper, m_GradientLibraryEditorState, PresetClickedCallback);
 			m_GradientLibraryEditor.showHeader = true;
 			m_GradientLibraryEditor.minMaxPreviewHeight = new Vector2(14f, 14f);
+			m_GradientLibraryEditor.GetCurrentLib().m_List = m_List;
 		}
 	}
 `

const file6 = `diff --git a/Editor/Mono/Inspector/GradientPresetLibraryInspector.cs b/Editor/Mono/Inspector/GradientPresetLibraryInspector.cs
--- a/Editor/Mono/Inspector/GradientPresetLibraryInspector.cs
+++ b/Editor/Mono/Inspector/GradientPresetLibraryInspector.cs
@@ -32,7 +32,7 @@ internal class GradientPresetLibraryEdit

 	private void OnEditButtonClicked(string libraryPath)
 	{
-		GradientPicker.Show(new Gradient());
+		GradientPicker.Show(new Gradient(), false);
 		GradientPicker.instance.currentPresetLibrary = libraryPath;
 	}
 }`

const file7 = `diff --git a/Editor/Src/GradientPreviewCache.cpp b/Editor/Src/GradientPreviewCache.cpp
--- a/Editor/Src/GradientPreviewCache.cpp
+++ b/Editor/Src/GradientPreviewCache.cpp
@@ -44,18 +44,18 @@ GradientPreviewCache::~GradientPreviewCa
 }


-Texture2D* GradientPreviewCache::GetPreview (GradientNEW& gradient)
+Texture2D* GradientPreviewCache::GetPreview (GradientNEW& gradient, bool list)
 {
-	return GetPreviewInternal(NULL, NULL, gradient);
+	return GetPreviewInternal(NULL, NULL, gradient, list);
 }

-Texture2D* GradientPreviewCache::GetPreview (SerializedProperty& property)
+Texture2D* GradientPreviewCache::GetPreview (SerializedProperty& property, bool list)
 {
 	property.SyncSerializedObjectVersion();
 	std::string propertyPath = property.GetPropertyPath();
 	Object* target = property.GetSerializedObject()->GetTargetObject();

-	Texture2D* tex = LookupCache(target, propertyPath.c_str());
+	Texture2D* tex = LookupCache(target, propertyPath.c_str(), list);
 	if (tex)
 		return tex;

@@ -63,20 +63,20 @@ Texture2D* GradientPreviewCache::GetPrev
 	if (gradient == NULL)
 		return NULL;

-	tex = GetPreviewInternal(target, propertyPath.c_str(), *gradient);
+	tex = GetPreviewInternal(target, propertyPath.c_str(), *gradient, list);
 	delete gradient;

 	return tex;
 }

-Texture2D* GradientPreviewCache::GetPreviewInternal (Object* obj, const char* propertyName, GradientNEW& gradient)
+Texture2D* GradientPreviewCache::GetPreviewInternal (Object* obj, const char* propertyName, GradientNEW& gradient, bool list)
 {
 	// Find cached preview texture
 	Texture2D* preview = NULL;
 	if (obj)
-		preview = LookupCache (obj, propertyName);
+		preview = LookupCache (obj, propertyName, list);
 	else
-		preview = LookupCache (gradient);
+		preview = LookupCache (gradient, list);

 	if (preview != NULL)
 		return preview;
@@ -86,21 +86,24 @@ Texture2D* GradientPreviewCache::GetPrev
 		ClearCache();

 	// Generate preview
-	preview = GeneratePreviewTexture(gradient);
+	if (list)
+		preview = GenerateColorListPreviewTexture(gradient);
+	else
+		preview = GeneratePreviewTexture(gradient);
 	if (preview == NULL)
 		return NULL;

 	// Inject preview into cache
 	if (obj)
 	{
-		CacheEntry entry (obj, propertyName);
+		CacheEntry entry (obj, propertyName, list);
 		entry.texture = preview;
 		bool didInsert = m_Entries.insert(entry).second;
 		Assert(didInsert);
 	}
 	else
 	{
-		CacheEntry entry (&gradient);
+		CacheEntry entry (&gradient, list);
 		entry.texture = preview;
 		bool didInsert = m_Entries.insert(entry).second;
 		Assert(didInsert);
@@ -109,9 +112,9 @@ Texture2D* GradientPreviewCache::GetPrev
 	return preview;
 }

-Texture2D* GradientPreviewCache::LookupCache (GradientNEW& gradient)
+Texture2D* GradientPreviewCache::LookupCache (GradientNEW& gradient, bool list)
 {
-	CacheEntry entry (&gradient);
+	CacheEntry entry (&gradient, list);
 	Entries::iterator result = m_Entries.find(entry);
 	if (result != m_Entries.end())
 		return result->texture;
@@ -119,9 +122,9 @@ Texture2D* GradientPreviewCache::LookupC
 		return NULL;
 }

-Texture2D* GradientPreviewCache::LookupCache (Object* obj, const char* propertyName)
+Texture2D* GradientPreviewCache::LookupCache (Object* obj, const char* propertyName, bool list)
 {
-	CacheEntry entry (obj, propertyName);
+	CacheEntry entry (obj, propertyName, list);
 	Entries::iterator result = m_Entries.find(entry);
 	if (result != m_Entries.end())
 		return result->texture;
@@ -167,6 +170,36 @@ Texture2D* GradientPreviewCache::Generat
 	return texture;
 }

+Texture2D* GradientPreviewCache::GenerateColorListPreviewTexture (GradientNEW& gradient)
+{
+	// Fixed size previews
+	const int width = 256;
+	const int height = 2;
+
+	Texture2D* texture = CreateObjectFromCode<Texture2D>(kDefaultAwakeFromLoad, kMemTextureCache);
+	texture->SetHideFlags(Object::kHideAndDontSave);
+	texture->InitTexture (width, height, kTexFormatRGBA32, Texture2D::kFlagNone, 1);
+
+	ImageReference image;
+	texture->GetWriteImageReference(&image, 0, 0);
+
+	for (int x = 0; x < width; x++)
+	{
+		int key = x * gradient.GetNumColorKeys() / width;
+		ColorRGBA32 color = gradient.GetKey(key);
+
+		// Set both rows
+		ColorRGBA32* pixel = reinterpret_cast<ColorRGBA32*> (image.GetRowPtr(0)) + x;
+		*pixel = color;
+
+		pixel = reinterpret_cast<ColorRGBA32*> (image.GetRowPtr(1)) + x;
+		*pixel = color;
+	}
+
+	texture->UpdateImageDataDontTouchMipmap();
+	return texture;
+}
+
 void GradientPreviewCache::SelectionHasChanged (const std::set<int>& selection)
 {
 	GradientPreviewCache::Get().ClearCache();
@@ -177,14 +210,17 @@ void GradientPreviewCache::ForceReloadIn
 	GradientPreviewCache::Get().ClearCache();
 }

-GradientPreviewCache::CacheEntry::CacheEntry (void* obj, const char* propertyName)
+GradientPreviewCache::CacheEntry::CacheEntry (void* obj, const char* propertyName, bool l)
 :	object(obj)
+,	list(l)
 {
 	hash_cstring hashGen;
 	hash = hashGen(propertyName);
 }

-GradientPreviewCache::CacheEntry::CacheEntry (GradientNEW* gradient)
-:	object(gradient), hash()
+GradientPreviewCache::CacheEntry::CacheEntry (GradientNEW* gradient, bool l)
+:	object(gradient)
+,	hash()
+,	list(l)
 {
 }`

const textLoremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing
 elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
 commodo consequat. Duis aute irure dolor in reprehenderit `


const comments = [
  { line: 66,
    comments: [
      {author: 'kate', message: textLoremIpsum, postDate: '1 day ago' },
      {author: 'kate2', message: textLoremIpsum, postDate: '1 day ago' }
    ]
  },
  { line: 103, comments: [{ author: 'bob', message: textLoremIpsum, postDate: '5 day ago'}]},
  { line: 122, comments: [{ author: 'john', message: textLoremIpsum, postDate: '10 day ago' }]},
]

// inlime comment statuses:
// issue: false/false, niceToHave: true/false, codeStyle: true/false

const comments1 = [
  { id: 'comment1',
    line: 63,
    comments: [
      {author: 'kate', message: textLoremIpsum, postDate: '1 day ago', issue: true, niceToHave: true, codeStyle: false },
      {author: 'kate2', message: textLoremIpsum, postDate: '1 day ago', issue: false, niceToHave: true, codeStyle: false }
    ],
    version: 'old',
  },
  { line: 136,
    id: 'comment2',
    comments: [
    { author: 'bob', message: textLoremIpsum, postDate: '5 day ago', issue: true, niceToHave: false, codeStyle: true}],
    version: 'new',
  },
  { line: 159,
    id: 'comment3',
    comments: [
    { author: 'john', message: textLoremIpsum, postDate: '10 day ago',issue: true, niceToHave: false, codeStyle: false }],
    version: 'new'
  },
  { line: 145,
    id: 'comment4',
    comments: [
    { author: 'john', message: textLoremIpsum, postDate: '5 day ago',issue: true, niceToHave: false, codeStyle: false }],
    version: 'new'
  },
]

export const PullRequestUnresolvedComments = [
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
  {author: 'Jogn Dou', message: textLoremIpsum, postDate: '1 day ago' },
  {author: 'kate2', message: textLoremIpsum, postDate: '2 day ago' },
]

const file9 = `@@ -36,9 +36,12 @@
},
    "preferGlobal": true,
    "scripts": {
-	"test": "jscs src/*.js && istanbul cover _mocha -- -u exports -R spec ./test/**/*",
      "style": "jscs src/*.js",
-	"codacy": "istanbul cover _mocha -- -u exports -R spec ./test/**/* && cat ./coverage/lcov.info | codacy-coverage"
+	"coverage": "istanbul cover _mocha -- -u exports -R spec ./test/**/*",
+	"test": "npm run style && npm run coverage",
+	"codacy": "npm run coverage && cat ./coverage/lcov.info | codacy-coverage",
+	"preversion": "npm test",
+	"postversion": "git push && git push --tags"
    },
    "bin": {
      "diff2html": "./bin/diff2html"
`


// file status means - changed/removed/added (random)

export const PullRequestData = [
  { name: 'Editor/Mono/EditorGUI.cs', type: 'c', diff: file1, comments: comments1, status: 0 },
  { name: 'Editor/Mono/GUI/GradientEditor.cs', type: 'c', diff: file2, comments: comments1, status: 0 },
  { name: 'Editor/Mono/GUI/GradientField.cs', type: 'c', diff: file3, comments: comments1, status: 2 },
  { name: 'Editor/Mono/Inspector/GradientPresetLibraryInspector.cs', type: 'c', diff: file4, comments: comments1, status: 0 },
  {
    name: 'Editor/Mono/ParticleSystemEditor/ParticleSystemModules/InitialModuleUI.cs',
    type: 'c',
    diff: file5,
    comments: [],
    status: 0
  },
  { name: 'Editor/Mono/GUI/GradientPicker.cs', type: 'c', diff: file6, comments: [], status: 1 },
  { name: 'Editor/Mono/Inspector/GradientPresetLibraryInspector.cs', type: 'c', diff: file7, comments: [], status: 0 },
  { name: 'Editor/Mono/EditorGUI.cs', type: 'c', diff: file1, comments: comments1, status: 0 },
  { name: 'Editor/Mono/GUI/GradientEditor.cs', type: 'c', diff: file2, comments: comments1, status: 0 },
  { name: 'Editor/Mono/GUI/GradientField.cs', type: 'c', diff: file3, comments: comments1, status: 2 },
  { name: 'Editor/Mono/Inspector/GradientPresetLibraryInspector.cs', type: 'c', diff: file4, comments: comments1, status: 0 },
  {
    name: 'Editor/Mono/ParticleSystemEditor/ParticleSystemModules/InitialModuleUI.cs',
    type: 'c',
    diff: file5,
    comments: [],
    status: 0
  },

]

export const NewPullRequestData = [
  { name: 'Editor/Mono/EditorGUI.cs', type: 'c',  diff: file1, comments: [], status: 0 },
  { name: 'Editor/Mono/GUI/GradientEditor.cs', type: 'c', diff: file2, comments: [], status: 0 },
  { name: 'Editor/Mono/GUI/GradientField.cs', type: 'c', diff: file3, comments: [], status: 2 },
  { name: 'Editor/Mono/Inspector/GradientPresetLibraryInspector.cs', type: 'c', diff: file4, comments: [], status: 0 },
  {
    name: 'Editor/Mono/ParticleSystemEditor/ParticleSystemModules/InitialModuleUI.cs',
    type: 'c',
    diff: file5,
    comments: [],
    status: 0
  },
  { name: 'Editor/Mono/GUI/GradientPicker.cs', type: 'c', diff: file6, comments: [], status: 1 },
  { name: 'Editor/Mono/Inspector/GradientPresetLibraryInspector.cs', type: 'c', diff: file7, comments: [], status: 0 },
]

export const PullRequestDescription = `[has gfx tests: one UI test was nonsensical and "always wrong", uncovered to be different kind of wrong after sprite packer packed atlas differently because of different hash now. After discussion with UI team, I changed the test to not be nonsense]

After adding xxHash to trunk a while ago, I thought that it would be
nice to have all hash related code under External/ in one place
(External/HashFunctions). This PR started like that, but then one commit
led to another, and it ended up "a review/sanitization of all our hash
function usages" somehow. Next thing I knew, 200+ changed files (though
mostly in a trivial way).

Changes:

*** Hash Function usage and helpers

- Runtime/Utilities/HashFunctions.h contains helpers for "95% use cases"
  of "I need to hash some data". Contains 32, 64, 128 bit hashes.
  	- 32 bit uses xxHash32 (on 32 bit), CityHash64 (on 64 bit) http://cyan4973.github.io/xxHash/
    - 64 bit uses CityHash64 https://github.com/google/cityhash
  	- 128 bit uses SpookyV2 http://burtleburtle.net/bob/hash/spooky.html
    - Performance investigations of all above: http://John Dou-p.info/blog/2016/08/09/More-Hash-Function-Tests/
  The helper functions added:
  	- ComputeHash, ComputeHash32, ComputeHash64, ComputeHash128
    - ComputeStringHash and ComputeShortStringHash
  	- Renamed Cipher to ComputePointerHash
    - Added ComputeIntHash (replaced copy-pasted functions found elsewhere)
- Previous direct usages of MurmurHash, xxHash, SpookyV2, FNV switched to use these
  wrapper functions.
  	- For the 128 bit hash, switched the very verbose (and typo-prone)
  	  interface that required passing in two pointers to 64 bit words.
- Previous usages of some bad hash functions switched to use the wrappers.
  Most notably, hash_cstring was HORRIBLE (no idea who thought it's a good
  idea (comes all the way from hg revision 0, and svn revision 0!).
  	- Potentially fixes insonsistencies in SpritePacker, in case of name
  	  collisions. Sprite packer compares texture names by hashes for ordering,
  	  and then by instance IDs. In case of a hash name collision, this can
  	  result in different packing on different runs! The new hashing function
  	  has much lower chance of hash collisions.
- Split off InstanceID hashing and InstanceID based hashtables out of
  HashFunctions.h, into HashInstanceID.h
- Renamed CStringHash.h to StringComparison.h
- Added performance tests for the hash functions


*** Hash128 class

- Hash128 class: added comments and unit tests.
- Behavior change! Instead of leaving uninitialized bytes in constructor
  (if passed less than 16), it sets them to zero now.
- Interface change! Changed constructor to take UInt8* instead of char, and make
  length mandatory. Similar change to Set function (also renamed it to SetData). A
  bunch of our own code was using this totally wrong! Some of the test code was even
  producing out-of-bounds reads by passing a short string, with default 16
  length value.


*** External (3rd party) hash function code

- All code moved under External/HashFunctions folder, with readme.txt there indicating
  what & where it came from.
- Removed unused code (e.g. Murmur contained whole SMHasher testing framework). That's
  where bulk of "8000 lines of code gone" in this PR comes from.
`

export const PullRequestHistory = {
1: [ { hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'}],
2: [ { hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'}],
3: [ { hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'},
{ hash: '0ac639ddea8d', commit: '[core] Fix more platform builds after trunk merge'}],
}

export const PullRequestHistory2 = [{value: '0ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '1ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '2ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '3ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '4ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '5ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '6ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '7ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '8ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '9ac639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '20a639ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '20a739ddea8d', label: '[core] Fix more platform builds after trunk merge'},
{ value: '20ac89ddea8d', label: '[core] Fix more platform builds after trunk merge'}]

export const prChangesetList3 = [
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: `[core] Rename InstanceIDHashTable template arguments (PR feedback), Lorem ipsum dolor sit amet, consectetur adipiscing
     elit, sed do eiusmod tempor incididunt ut labore`,
    build: { name: 'ABV-08822', status: 0 },
    status: 3, // 1,2,3
    version: 3,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: `[core] Rename InstanceIDHashTable template arguments (PR feedback), Lorem ipsum dolor sit amet, consectetur adipiscing
     elit, sed do eiusmod tempor incididunt ut labore ,Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore`,
    build: null,
    status: 1, // 1,2,3
    version: 3,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: null,
    status: 1, // 1,2,3
    version: 3,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: null,
    status: 2, // 1,2,3
    version: 3,
  }]
  export const prChangesetList2 = [
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: { name: 'ABV-08822', status: 1 },
    status: 2, // 1,2,3
    version: 2,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: `[core] Rename InstanceIDHashTable template arguments (PR feedback), Lorem ipsum dolor sit amet, consectetur adipiscing
     elit, sed do eiusmod tempor incididunt ut labore , Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore ,Lorem ipsum dolor sit amet, consectetur adipiscing
       elit, sed do eiusmod tempor incididunt ut labore `,
    build: { name: 'ABV-08822', status: 1 },
    status: 1, // 1,2,3
    version: 2,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: { name: 'ABV-08822', status: 1 },
    status: 2, // 1,2,3
    version: 2,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: null,
    status: 1, // 1,2,3
    version: 2,
  }]

export const prChangesetList1 = [
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: { name: 'ABV-08822', status: 1 },
    status: 2, // 1,2,3
    version: 1,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: null,
    status: 1, // 1,2,3
    version: 1,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: { name: 'ABV-08822', status: 1 },
    status: 1, // 1,2,3
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: { name: 'ABV-08822', status: 1 },
    status: 3, // 1,2,3
    version: 1,
  },
  {
    date: '2016-08-15 20:31:23',
    user: 'John Dou',
    hash: '0ac639ddea8d',
    branch: 'core/hash-functions-cleanup',
    message: '[core] Rename InstanceIDHashTable template arguments (PR feedback)',
    build: null,
    status: 3, // 1,2,3
    version: 1,
  },
]

export const prChangesetList = [
  { version: 3, data: prChangesetList3, date: '2016-08-15 20:31:23', },
  { version: 2, data: prChangesetList2, date: '2016-08-15 20:31:23', },
  { version: 1, data: prChangesetList1, date: '2016-08-15 20:31:23', },
]

export const prIssues = [
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: '769',
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 2,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: '769',
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 1,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: '769',
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 1,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: '769',
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 3,
  },
  {
    title: 'this would be better as word.h-style',
    age: '18 days and 19 hours ago',
    file: 'Editor/Src/GUIDPersistentManager.cpp',
    line: '769',
    createdby: 'John Dou',
    assignedto: 'Bob Dou',
    status: 1,
  },
]

export const prReviewers = new Set([
  'fkenney', 'kc',
])

export const prUsers = [
  { fullName: 'Sonja Bark', username: 'sbark' },
  { fullName: 'Hattie Hinchman', username: 'hinchman' },
  { fullName: 'Felicidad Kenney', username: 'fkenney' },
  { fullName: 'Lynsey Castello', username: 'castello' },
  { fullName: 'Kazuko Cournoyer', username: 'kc' },
  { fullName: 'Julietta Pfannenstiel', username: 'julietta' },
  { fullName: 'Tom Oleary', username: 'oleary' },
  { fullName: 'Yvonne Chiodo', username: 'yvonne' },
  { fullName: 'Elaina Brake', username: 'brake' },
  { fullName: 'Librada Wojtczak', username: 'wojtczak' },
  { fullName: 'Debby Arms', username: 'arms' },
  { fullName: 'Harriet Buth', username: 'special-username' },
  { fullName: 'Brandy Lanphear', username: 'brandylanphear' },
  { fullName: 'Kori Hamburg', username: 'hamburg' },
  { fullName: 'Deloras Gorby', username: 'gorby' },
  { fullName: 'Kortney Bustamante', username: 'kbustamante' },
  { fullName: 'Delicia Bigler', username: 'dbigler' },
  { fullName: 'Heriberto Cannon', username: 'cannon' },
  { fullName: 'Launa Sesco', username: 'lsesco' },
  { fullName: 'Agnus Raven', username: 'raven' },
  { fullName: 'Lynette Stiller', username: 'lynettestiller' },
]

export const PullRequestsDataList = [
  {
    title: 'Enabled linq tests',
    date: '29 minutes and 5 seconds ago',
    to : 'unity/unity#trunk',
    author: 'Elena Savinova',
    status: 0,
    delta: { removed: 10, changed: 2, added: 1 },
    build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
 },
 {
   title: 'Fix for animator override controller',
   date: '40 minutes and 15 seconds ago',
   to : 'unity/unity#trunk',
   author: 'Sonny Myette',
   status: 0,
   delta: { removed: 10, changed: 2, added: 1 },
   build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
  title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
  date: '42 minutes and 46 seconds ago',
  to : 'unity/unity#5.3/staging',
  author: 'Lukas Chodosevičius',
  status: 2,
  delta: { removed: 110, changed: 211, added: 1900 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
  date: '42 minutes and 46 seconds ago',
  to : 'unity/unity#5.4/staging',
  author: 'Chris Pacey',
  status: 1,
  delta: { removed: 1, changed: 12, added: 111 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
  title: 'Enabled linq tests',
  date: '29 minutes and 5 seconds ago',
  to : 'unity/unity#trunk',
  author: 'Elena Savinova',
  status: 0,
  delta: { removed: 10, changed: 2, added: 1 },
  build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
 title: 'Fix for animator override controller',
 date: '40 minutes and 15 seconds ago',
 to : 'unity/unity#trunk',
 author: 'Sonny Myette',
 status: 0,
 delta: { removed: 10, changed: 2, added: 1 },
 build: { name: 'ABV-12345', status: 'FAILED', date: '1 hour aqo' }
},
{
title: 'GLSL extensions fix and Metro MSAA crash workaround (v2)',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.3/staging',
author: 'Lukas Chodosevičius',
status: 2,
delta: { removed: 110, changed: 211, added: 1900 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
{
title: 'Case 824979 : XCTest Unity tests fail due to a linker error',
date: '42 minutes and 46 seconds ago',
to : 'unity/unity#5.4/staging',
author: 'Chris Pacey',
status: 1,
delta: { removed: 1, changed: 12, added: 111 },
build: { name: 'ABV-12345', status: 'PASSED', date: '1 hour aqo' }
},
 ]
